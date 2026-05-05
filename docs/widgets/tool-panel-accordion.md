# Tool panel accordion (`org.rd.plugin.uigoodies.ToolPanelAccordion`)

Wraps multiple **Tools Panel** shortcuts in a **single accordion** section (title + icon + nested `widgets`). Use it under `craftercms.components.ToolsPanel` when you want grouped embedded tools instead of many top-level entries.

## Configuration

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
