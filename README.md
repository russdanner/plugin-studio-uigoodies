# Studio UI Goodies
This is a plugin that contains a number of UI "Goodies"

# Installation

Install the plugin via Studio's Plugin Management UI under `Site Tools` > `Plugin Management`.

# Widgets
- Toolbar Edit button
- Toolbar Publish button

# Toolbar Edit button
```
<widget id="org.rd.plugin.uigoodies.EditOrViewCurrent">
   <plugin id="org.rd.plugin.uigoodies"
           site="{site}"
           type="apps"
           name="uigoodies"
           file="index.js"/>
   <configuration>
       <useIcon>true</useIcon>
   </configuration>
</widget>
```

# Toolbar Publish button
```
<widget id="org.rd.plugin.uigoodies.PublishOrRequestPublish">
   <plugin id="org.rd.plugin.uigoodies"
           site="{site}"
           type="apps"
           name="uigoodies"
           file="index.js"/>
   <configuration>
       <useIcon>true</useIcon>
   </configuration>
</widget>
```
