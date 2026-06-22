package plugins.org.rd.plugin.uigoodies

import java.nio.file.DirectoryStream
import java.nio.file.Files
import java.nio.file.Path

/**
 * NIO helpers for Groovy sandbox compatibility (avoid {@code java.io.File} construction).
 */
final class DevContentOpsSandboxIoSupport {

    private DevContentOpsSandboxIoSupport() {}

    static Path workTreePath(String absoluteWorkTreePath) {
        return Path.of(DevContentOpsSupport.plainString(absoluteWorkTreePath))
    }

    static Path gitDirPath(Path workTree) {
        return workTree.resolve('.git')
    }

    static Path scratchDir(Path workTree) {
        Path dir = gitDirPath(workTree).resolve('uigoodies-scratch')
        Files.createDirectories(dir)
        return dir
    }

    static Path scratchFile(Path workTree, String name) {
        return scratchDir(workTree).resolve(DevContentOpsSupport.plainString(name))
    }

    static void writeUtf8(Path path, String content) {
        Files.writeString(path, content ?: '')
    }

    static String readUtf8(Path path) {
        if (!Files.exists(path)) {
            return ''
        }
        return Files.readString(path).trim()
    }

    static void deleteQuietly(Path path) {
        try {
            Files.deleteIfExists(path)
        } catch (Exception ignored) {
        }
    }

    static long directorySize(Path root) {
        if (!Files.exists(root) || !Files.isDirectory(root)) {
            return 0L
        }
        long[] total = [0L] as long[]
        accumulateRegularFileBytes(root, total)
        return total[0]
    }

    private static void accumulateRegularFileBytes(Path dir, long[] total) {
        Files.newDirectoryStream(dir).withCloseable { DirectoryStream<Path> stream ->
            stream.each { Path entry ->
                if (Files.isRegularFile(entry)) {
                    total[0] += Files.size(entry)
                } else if (Files.isDirectory(entry)) {
                    accumulateRegularFileBytes(entry, total)
                }
            }
        }
    }

    static long looseObjectBytes(Path gitDir) {
        Path objects = gitDir.resolve('objects')
        if (!Files.isDirectory(objects)) {
            return 0L
        }
        long total = 0L
        Files.newDirectoryStream(objects).withCloseable { DirectoryStream<Path> stream ->
            stream.each { Path child ->
                if (Files.isDirectory(child) && child.fileName.toString().length() == 2) {
                    Files.newDirectoryStream(child).withCloseable { DirectoryStream<Path> inner ->
                        inner.each { Path obj ->
                            if (Files.isRegularFile(obj)) {
                                total += Files.size(obj)
                            }
                        }
                    }
                }
            }
        }
        return total
    }

    static long packFileBytes(Path gitDir) {
        Path pack = gitDir.resolve('objects/pack')
        if (!Files.isDirectory(pack)) {
            return 0L
        }
        long total = 0L
        Files.newDirectoryStream(pack).withCloseable { DirectoryStream<Path> stream ->
            stream.each { Path entry ->
                if (Files.isRegularFile(entry) && entry.fileName.toString().endsWith('.pack')) {
                    total += Files.size(entry)
                }
            }
        }
        return total
    }

    static int looseObjectCount(Path gitDir) {
        Path objects = gitDir.resolve('objects')
        if (!Files.isDirectory(objects)) {
            return 0
        }
        int count = 0
        Files.newDirectoryStream(objects).withCloseable { DirectoryStream<Path> stream ->
            stream.each { Path child ->
                if (Files.isDirectory(child) && child.fileName.toString().length() == 2) {
                    Files.newDirectoryStream(child).withCloseable { DirectoryStream<Path> inner ->
                        inner.each { Path obj ->
                            if (Files.isRegularFile(obj)) {
                                count++
                            }
                        }
                    }
                }
            }
        }
        return count
    }

    static int packFileCount(Path gitDir) {
        Path pack = gitDir.resolve('objects/pack')
        if (!Files.isDirectory(pack)) {
            return 0
        }
        int count = 0
        Files.newDirectoryStream(pack).withCloseable { DirectoryStream<Path> stream ->
            stream.each { Path entry ->
                if (Files.isRegularFile(entry) && entry.fileName.toString().endsWith('.pack')) {
                    count++
                }
            }
        }
        return count
    }

    /**
     * Crafter sandboxes are opened as bare repos via {@code sandbox/.git}. When commit-tree checkout stats
     * are empty, scan the live work tree for git-sizer-style checkout metrics.
     */
    static Map checkoutStatsFromWorkTree(Path workTreeRoot) {
        if (!workTreeRoot || !Files.isDirectory(workTreeRoot)) {
            return null
        }
        Set<String> directories = new LinkedHashSet<>()
        Map counters = [
            maxPathDepth: 0,
            maxPathLength: 0,
            fileCount: 0,
            totalFileBytes: 0L,
            symlinks: 0
        ]
        accumulateCheckoutStats(workTreeRoot, workTreeRoot, directories, counters)
        return [
            directories: directories.size(),
            maxPathDepth: counters.maxPathDepth as int,
            maxPathLength: counters.maxPathLength as int,
            fileCount: counters.fileCount as int,
            totalFileBytes: counters.totalFileBytes as long,
            symlinks: counters.symlinks as int,
            submodules: 0
        ]
    }

    private static void accumulateCheckoutStats(
        Path root,
        Path dir,
        Set<String> directories,
        Map counters
    ) {
        Files.newDirectoryStream(dir).withCloseable { DirectoryStream<Path> stream ->
            stream.each { Path entry ->
                String name = entry.fileName.toString()
                if (name == '.git') {
                    return
                }
                String path = root.relativize(entry).toString().replace('\\', '/')
                if (Files.isSymbolicLink(entry)) {
                    counters.symlinks = (counters.symlinks as int) + 1
                    updateCheckoutPathStats(path, counters, directories)
                } else if (Files.isDirectory(entry)) {
                    if (path) {
                        directories.add(path)
                    }
                    updateCheckoutPathStats(path, counters, directories)
                    accumulateCheckoutStats(root, entry, directories, counters)
                } else if (Files.isRegularFile(entry)) {
                    counters.fileCount = (counters.fileCount as int) + 1
                    try {
                        counters.totalFileBytes = (counters.totalFileBytes as long) + Files.size(entry)
                    } catch (Exception ignored) {
                    }
                    updateCheckoutPathStats(path, counters, directories)
                }
            }
        }
    }

    private static void updateCheckoutPathStats(String path, Map counters, Set<String> directories) {
        if (!path) {
            return
        }
        int depth = path.split('/').length
        if (depth > (counters.maxPathDepth as int)) {
            counters.maxPathDepth = depth
        }
        if (path.length() > (counters.maxPathLength as int)) {
            counters.maxPathLength = path.length()
        }
        if (directories) {
            int slash = path.lastIndexOf('/')
            while (slash > 0) {
                String dir = path.substring(0, slash)
                directories.add(dir)
                slash = dir.lastIndexOf('/')
            }
        }
    }
}
