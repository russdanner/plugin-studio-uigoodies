# Copy current page URL (`org.rd.plugin.uigoodies.CopyCurrentPageUrl`)

Toolbar control that copies a **full preview or environment URL** for the current page. Patterns use **`[URL]`** and **`[SITEID]`** placeholders, replaced at runtime with the page URL and site id.

## Configuration (`config/studio/ui.xml`)

**Placement:** under **`craftercms.components.PreviewToolbar`** → `leftSection`, `middleSection`, or `rightSection` → `widgets`.

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

`[URL]` and `[SITEID]` are substituted with the actual page URL and site id.
