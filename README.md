# Studio UI Goodies
This is a plugin that contains a number of UI "Goodies."

What is a goodie? Nothing specific. This plugin is a collection of UI tweaks and alternatives to help you customize the editing experience for your content authors to make them as efficient as possible. 

If you see a widget that helps you here, install it and be happy. If not, make the world a better place by doing a bit of programming and send us pull request :)

## Widgets
- Toolbar Edit button
- Toolbar Publish button

# Installation

Install the plugin via Studio's Plugin Management UI under `Site Tools` > `Plugin Management`.

## Install based on this repository
You can also install this plugin by cloning this repository and using the Studio API. 
1. Create a Studio JWT Token.
2. Execute the following CURL command a terminal
```
curl --location --request POST 'http://SERVER_AND_PORT/studio/api/2/marketplace/copy' \
--header 'Authorization: Bearer THE_JWT_TOKEN_FOR_STUDIO' \
--header 'Content-Type: application/json' \
--data-raw '{
  "siteId": "YOUR-SITE-ID",
  "path": "THE_ABSOLUTEL_FILE_SYSTEM_PATH_TO_THIS_REPO",
  "parameters": { }
}
```

# Widget Configuration Guide

## Toolbar Edit button
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

## Toolbar Publish button
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
