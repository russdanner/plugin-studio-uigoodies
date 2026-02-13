# Studio UI Goodies

This is a plugin that contains a number of UI "Goodies."

What is a goodie? Nothing specific. This plugin is a collection of UI tweaks and alternatives to
help you customize the editing experience for your content authors to make them as efficient as
possible.

If you see a widget that helps you here, install it and be happy. If not, make the world a better
place by doing a bit of programming and send us pull request :)

# Installation

[//]: # (## Install via CrafterCMS Marketplace)

[//]: # (Install the plugin via Studio's Plugin Management UI under `Site Tools` > `Plugin Management`.)

## Install based on this repository

You can install this plugin by cloning this repository and using the Studio API.

1. Create a Studio API token.
2. Execute the following CURL command a terminal

```bash
curl --location --request POST 'http://SERVER_AND_PORT/studio/api/2/marketplace/copy' \
--header 'Authorization: Bearer YOUR_STUDIO_API_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "siteId": "YOUR-SITE-ID",
  "path": "THE_ABSOLUTEL_FILE_SYSTEM_PATH_TO_THIS_REPO",
  "parameters": { }
}
```

Here is a real-life functioning example:

```bash
curl --location --request POST 'http://localhost:8080/studio/api/2/marketplace/copy' \
--header 'Authorization: Bearer eyJhbGciOiJQQkVTMi1IUzUxMitBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiY3R5IjoiSldUIiwicDJjIjo2NTUzNiwicDJzIjoiQ0hmZDQ4SmlsT1I5bzVociJ9.Iq5RcXLbT85nTXKWFr054e0LZ-RaMpkVVdAo5UtqW17hgkJ_MNPIXPf_NcW9q-GuRsHpCjtwbhTjgHHLdLK8vbl8Kb3dKsS-.HdJcVASJ1_SnaafB5hiY2g.T0hOxNfhfDuhVPEF1lCgCCuuChpj_8tvpD48CXo8RoXOXqa-fgkyOV88dk0OaRDmKY2QLcPeiQAddGI_gsn_bJd0LM0lA_zVpDdiUkWvDYzO5tDefpG3z7tfC5DWIkHUtPQBlWLNkkIzNyv2xsSEQUGClPurP2Bue70Q8WG75YPZkhl6uw2FWKM_ida3kyCakOgt51TVKN3Fbn4MbtuzX6f5Rc0QPOs0i9E0ejejfL5U4sHu-0ULFTPmSrECxcSg_yjPRu2Z39IhPPJ44ehMClho4kWGtsLnMiP0380BkspNTEN1O8tUl1D3bZ5nznC_iat0EM651t-uFAGrVKrlsg.9P0gqUGEvr6XDFXm8Py_0hdfXKcdF7BR8T_2gqu7Jcw' \
--header 'Content-Type: application/json' \
--data-raw '{
  "siteId": "ed3",
  "path": "/Volumes/Projects/repositories/plugin-studio-uigoodies",
  "parameters": { }
}'
```

# Building

To build this plugin on your own, make your customizations as required, then run `yarn` and then `yarn dist` in the
`uigoodies-components` folder. The output will be placed in the `/authoring` folder of this project.

# Widget Description and Configuration Guide

## Toolbar Edit button

```xml

<widget id="org.rd.plugin.uigoodies.EditOrViewCurrent">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <configuration>
        <useIcon>true</useIcon>
    </configuration>
</widget>
```

## Toolbar Publish button

```xml

<widget id="org.rd.plugin.uigoodies.PublishOrRequestPublish">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <configuration>
        <useIcon>true</useIcon>
    </configuration>
</widget>
```

## Sidebar Tool Panel Accordion

```xml

<widget id="org.rd.plugin.uigoodies.ToolPanelAccordion">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <configuration>
        <title>Shortcuts</title>
        <icon id="@mui/icons-material/SentimentSatisfiedOutlined"/>
        <sxs>
            <accordionDetails>
                <paddingLeft>15px</paddingLeft>
            </accordionDetails>
        </sxs>
        <widgets>
            <widget id="craftercms.components.ToolsPanelEmbeddedAppViewButton">
                <configuration>
                    <title>Content Types</title>
                    <icon id="@mui/icons-material/WidgetsOutlined"/>
                    <widget id="craftercms.components.ContentTypeManagement">
                        <configuration>
                            <embedded>true</embedded>
                        </configuration>
                    </widget>
                </configuration>
            </widget>
            <widget id="craftercms.components.ToolsPanelEmbeddedAppViewButton">
                <configuration>
                    <title>Encryption Tool</title>
                    <icon id="@mui/icons-material/LockOutlined"/>
                    <widget id="craftercms.components.SiteEncryptTool">
                        <configuration>
                            <embedded>true</embedded>
                        </configuration>
                    </widget>
                </configuration>
            </widget>
            <widget id="craftercms.components.ToolsPanelEmbeddedAppViewButton">
                <configuration>
                    <title>Configuration</title>
                    <icon id="@mui/icons-material/SettingsApplicationsOutlined"/>
                    <widget id="craftercms.components.SiteConfigurationManagement">
                        <configuration>
                            <embedded>true</embedded>
                        </configuration>
                    </widget>
                </configuration>
            </widget>
            <widget id="craftercms.components.ToolsPanelEmbeddedAppViewButton">
                <configuration>
                    <title>Plugin Management</title>
                    <icon id="@mui/icons-material/ExtensionOutlined"/>
                    <widget id="craftercms.components.PluginManagement">
                        <configuration>
                            <embedded>true</embedded>
                        </configuration>
                    </widget>
                </configuration>
            </widget>
        </widgets>
    </configuration>
</widget>
```

## Sidebar Content Upload Button

```xml

<widget id="org.rd.plugin.uigoodies.openContentUploadPanelButton">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <!-- optional parameters -->
    <configuration>
        <title>Upload Content</title>
        <icon id="@mui/icons-material/FileUploadRounded"/>
        <defaultPath>/site/components/headers</defaultPath>
        <allowPathSelection>true</allowPathSelection>
    </configuration>
</widget>
```

## Toolbar Content Upload Button

```xml

<widget id="org.rd.plugin.uigoodies.openContentUploadToolbarButton">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <!-- optional parameters -->
    <configuration>
        <title>Upload Content</title>
        <dialogTitle>Upload Content</dialogTitle>
        <icon id="@mui/icons-material/FileUploadRounded"/>
        <defaultPath>/site/components/headers</defaultPath>
        <allowPathSelection>true</allowPathSelection>
    </configuration>
</widget>
```

## Sidebar Bulk Publish Button

```xml

<widget id="org.rd.plugin.uigoodies.openBulkPublishPanelButton">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <!-- optional parameters -->
    <configuration>
        <title>Bulk Publish</title>
        <icon id="@mui/icons-material/AutoAwesomeMotionOutlined"/>
        <defaultPath>/static-assets</defaultPath>
    </configuration>
</widget>
```

## Toolbar Bulk Publish Button

```xml

<widget id="org.rd.plugin.uigoodies.openBulkPublishToolbarButton">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <!-- optional parameters -->
    <configuration>
        <title>Bulk Publish</title>
        <dialogTitle>Bulk Publish</dialogTitle>
        <icon id="@mui/icons-material/AutoAwesomeMotionOutlined"/>
        <defaultPath>/static-assets</defaultPath>
    </configuration>
</widget>
```

## Toolbar Git Pull and Push support

This widget is useful if you have a DevContentOps process that requires business users to pull and push from a specific
remote and branches

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

## Toolbar Copy Page URL button

```xml

<widget id="org.rd.plugin.uigoodies.CopyCurrentPageUrl">
    <plugin
            id="org.rd.plugin.uigoodies"
            site="{site}"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <configuration>
        <useIcon>true</useIcon>
        <environments>
            <label>local</label>
            <pattern><![CDATA[http://localhost:8080/studio/preview#/?page=[URL]&site=[SITEID]]]></pattern>
            <label>preview</label>
            <pattern><![CDATA[https://authoring-myco.com/studio/preview#/?page=[URL]&site=[SITEID]]]></pattern>
            <label>staging</label>
            <pattern><![CDATA[https://qa.mysite.com[URL]]]></pattern>
            <label>live</label>
            <pattern><![CDATA[https://mysite.com[URL]]]></pattern>
        </environments>
    </configuration>
</widget>
```

* `[URL]` and `[SITEID]` macros will be replaced by the actual page url and the site id

## Sidebar Component Preview Path Navigator

Crafter does not support previewing *components* inside the Studio UI - it only supports previewing *pages*. However, on
headless sites, it is often necessary to be able to preview how a component will look when rendered. This plugin allows
you to do that.

This plugin allows clicks in the sidebar to preview an item through a proxied app. The app expects a URL path
that matches the path to the content item in the Crafter repo.

Under the covers, it changes the `onItemClick` event of the `PathNavigator` Crafter React component, to redirect the
request to a different URL.

By default, the `onItemClick` event, opens a Dialog Box to view and edit the component properties. This behavior
is being selectively overridden by this plugin.

When an item is clicked from the plugin path navigator, it uses the item path (without the .xml extension) as URL.

#### Example:

Assume you have a component descriptor at `/site/components/cards/bb8847b4-7b14-7962-5255-f7290cb43c42.xml`
Then the preview URL that this plugin will generate could look like this:

```text
http://localhost:8080/studio/preview#/?page=/card/bb8847b4-7b14-7962-5255-f7290cb43c42&site=cool-demo-site
```

Note, the actual mapping between the storage URL and the render URL can be customized in the plugin configuration
using the `paths` element.

Either way, it is necessary to set up your app to be able to respond to the url created by this plugin.

Add the following to the `ui.xml` files, underneath the `pages` section in the `craftercms.components.ToolsPanel`
widget. Note that nonPreviewablePaths and `paths` require their own configuration:

- `widget id`: This the widget ID used to register the plugin (it's in our `index.tsx` file - you should leave this set
  as shown in the example below.
- `rootPath`: The root of the content storage tree that will be rendered
- `paths`: a set of `source`:`target` pairs that provide the path substitution for the preview URL. The `source` is
  the Crafter store URL prefix (i.e. where the item lives in the Crafter repo), and the `target` is the path prefix in
  the preview URL. This is useful when the Crafter repo path does not match the preview URL path.
- `nonPreviewablePaths`: A regex that will exclude paths from being previewed - items matching this regex will render
  the form instead of preview
- `excludedPaths`: A comma-separated list of paths that will be excluded from the navigation tree entirely (this is a
  pass-through property to the Crafter PathNavigator component)
- `limit`: the maximum number of records to show before paginating

```xml

<widget id="org.rd.plugin.uigoodies.ComponentPreviewPathNavigator">
    <plugin
            id="org.rd.plugin.uigoodies"
            type="apps"
            name="uigoodies"
            file="index.js"
    />
    <configuration>
        <icon>@mui/icons-material/DevicesRounded</icon>
        <label>Content</label>
        <rootPath>/site/components/content</rootPath>
        <paths>
            <item>
                <source>/site/components/content/articles</source>
                <target>/article</target>
            </item>
            <item>
                <source>/site/components/content/videos</source>
                <target>/video</target>
            </item>
        </paths>
        <nonPreviewablePaths>.*\/crafter-level-descriptor.level.xml,.*/my-configs/.*</nonPreviewablePaths>
        <limit>50</limit>
    </configuration>
</widget>
```