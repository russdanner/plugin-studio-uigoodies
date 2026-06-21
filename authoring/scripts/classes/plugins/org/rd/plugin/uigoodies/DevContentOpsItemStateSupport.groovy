package plugins.org.rd.plugin.uigoodies

import org.craftercms.studio.api.v2.service.item.internal.ItemServiceInternal

/**
 * Direct item state bit manipulation for DevContentOps Site Items tools.
 */
final class DevContentOpsItemStateSupport {

    private DevContentOpsItemStateSupport() {}

    static ItemServiceInternal itemServiceInternal(def applicationContext) {
        return applicationContext?.get('itemServiceInternal') as ItemServiceInternal
    }

    static Map updateItemStateBits(
        def applicationContext,
        String siteId,
        String path,
        long onMask,
        long offMask
    ) {
        try {
            ItemServiceInternal itemSvc = itemServiceInternal(applicationContext)
            if (!itemSvc) {
                return DevContentOpsSupport.errorMap('Item service is not available in Studio')
            }
            String normalizedPath = DevContentOpsSupport.jsonSafeText(path ?: '')
            if (!normalizedPath) {
                return DevContentOpsSupport.errorMap('path is required')
            }
            if (onMask == 0L && offMask == 0L) {
                return DevContentOpsSupport.errorMap('onMask or offMask is required')
            }
            itemSvc.updateStateBits(siteId, normalizedPath, onMask, offMask)
            return [
                success: true,
                siteId: DevContentOpsSupport.jsonSafeText(siteId),
                path: normalizedPath,
                onMask: onMask,
                offMask: offMask
            ]
        } catch (Exception e) {
            return DevContentOpsSupport.failureFromThrowable(e, 'Failed to update item state bits')
        }
    }

    static Map updateItemStateBitsBulk(
        def applicationContext,
        String siteId,
        Collection<String> paths,
        long onMask,
        long offMask
    ) {
        try {
            ItemServiceInternal itemSvc = itemServiceInternal(applicationContext)
            if (!itemSvc) {
                return DevContentOpsSupport.errorMap('Item service is not available in Studio')
            }
            List<String> normalizedPaths = (paths ?: [])
                .collect { DevContentOpsSupport.jsonSafeText(it?.toString() ?: '') }
                .findAll { it }
            if (!normalizedPaths) {
                return DevContentOpsSupport.errorMap('paths are required')
            }
            if (onMask == 0L && offMask == 0L) {
                return DevContentOpsSupport.errorMap('onMask or offMask is required')
            }
            itemSvc.updateStateBitsBulk(siteId, normalizedPaths, onMask, offMask)
            return [
                success: true,
                siteId: DevContentOpsSupport.jsonSafeText(siteId),
                count: normalizedPaths.size(),
                onMask: onMask,
                offMask: offMask
            ]
        } catch (Exception e) {
            return DevContentOpsSupport.failureFromThrowable(e, 'Failed to bulk update item state bits')
        }
    }
}
