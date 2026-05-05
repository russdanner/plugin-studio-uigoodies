# Git pull and push (`org.rd.plugin.uigoodies.PullPushRemoteButtons`)

Toolbar **Pull** / **Push** actions against a named **remote** and **branches**. Useful when authors participate in a **DevContentOps** workflow (pull updates, push to an environment) without leaving Studio.

## Configuration

```xml
<widget id="org.rd.plugin.uigoodies.PullPushRemoteButtons">
    <plugin id="org.rd.plugin.uigoodies" site="{site}" type="apps" name="uigoodies" file="index.js"/>
    <configuration>
        <useIcon>false</useIcon>

        <remoteName>origin</remoteName>
        <mergeStrategy>none</mergeStrategy>

        <pullBranch>master</pullBranch>
        <pullLabel>Pull from Env X</pullLabel>

        <pushBranch>master</pushBranch>
        <pushLabel>Push to Env X</pushLabel>

        <enablePull>true</enablePull>
        <enablePush>true</enablePush>

    </configuration>
</widget>
```
