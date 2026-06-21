/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import scripts.libs.CommonLifecycleApi
import java.util.UUID
import groovy.util.logging.Slf4j
import org.dom4j.DocumentHelper

@Slf4j
class LocaleFieldsOnCopyContentTypeHook {

    def site
    def path
    def contentLoader
    def applicationContext

    def getLocaleFromPath(path) {
        def matcher = (path =~ /^\/site\/[^\/]+\/([^\/]+)\//)
        if (matcher) {
            return matcher.group(1)
        } else {
            return ''
        }
    }

    def updateElement(name, text, elem, rootElem) {
        if (elem) {
            elem.text = text
        } else {
            def newElem = DocumentHelper.createElement(name)
                newElem.text = text

            rootElement.add(newElem)
        }
    }

    def run() {
        log.info("Running {} for path {}", getClass().getSimpleName(), path)

        def contentService = applicationContext.getBean("cstudioContentService")
        def document = contentLoader.getContent(site, path)
        def rootElem = document.rootElement
        def localeCodeElem = rootElem.selectSingleNode("localeCode_s")
        def sourceLocaleCodeElem = rootElem.selectSingleNode("sourceLocaleCode_s")
        def localeSourceIdElem = rootElem.selectSingleNode("localeSourceId_s")
        def pathLocaleCode = getLocaleFromPath(path)
        def originLocaleCode = localeCodeElem.text

        if (localeCodeElem && originLocaleCode) {
            if (originLocaleCode != pathLocaleCode) {
                // If the locale is different, update the locale code, and keep the locale source ID
                log.info("Original locale code ({}) is different from current locale code in path ({}). " +
                         "Updating the locale field.", originLocaleCode, pathLocaleCode)

                updateElement("localeCode_s", pathLocaleCode, localeCodeElem, rootElem)

                // update shared component link to the new locale if component exists in the new locale
                def sharedComponents = rootElem.selectNodes('//*[@item-list="true"]')
                sharedComponents.each { element ->
                    def items = element.elements('item')
                    items.each { itemElm ->
                        if (itemElm.attributeValue('inline')) {
                            // item is not a shared component
                            return
                        }

                        ['key', 'include'].each { elementName ->
                            def replaceElm = itemElm.element(elementName)
                            def isSharedComponent = replaceElm && replaceElm.text && replaceElm.text.startsWith('/site/') && replaceElm.text.endsWith('.xml')
                            if (isSharedComponent) {
                                def newPath = replaceElm.text.replace("/${originLocaleCode}/", "/${pathLocaleCode}/")
                                def contentExists = contentService.contentExists(site, newPath)
                                if (contentExists) {
                                    log.info("Shared component ({}) exists for the element ({}). " +
                                             "Updating the link.", newPath, "${element.getName()}.${itemElm.getName()}.${elementName}")
                                    updateElement(elementName, newPath, replaceElm, rootElem)
                                }
                            }
                        }
                    }
                }
            } else {
                // If the locale is the same, create a new locale source ID
                log.info("Original locale code ({}) is the same as current locale code in path ({}). " +
                         "Generating new locale source ID and updating the source locale code to the current one",
                         localeCodeElem.text, pathLocaleCode)

                updateElement("localeSourceId_s", UUID.randomUUID().toString(), localeSourceIdElem, rootElem)
                updateElement("sourceLocaleCode_s", pathLocaleCode, sourceLocaleCodeElem, rootElem)
            }
        }

        // Write content
        def is = new ByteArrayInputStream(document.asXML().getBytes('UTF-8'))
            contentService.writeContent(site, path, is)
    }

}

def contentLifecycleParams =[:]
    contentLifecycleParams.site = site
    contentLifecycleParams.path = path
    contentLifecycleParams.user = user
    contentLifecycleParams.contentType = contentType
    contentLifecycleParams.contentLifecycleOperation = contentLifecycleOperation
    contentLifecycleParams.contentLoader = contentLoader
    contentLifecycleParams.applicationContext = applicationContext

// Only run if it's a copy or a duplicate
if (contentLifecycleOperation == "COPY" || contentLifecycleOperation == "DUPLICATE") {
    def hook = new LocaleFieldsOnCopyContentTypeHook()
        hook.site = site
        hook.path = path
        hook.contentLoader = contentLoader
        hook.applicationContext = applicationContext

    hook.run()
}

def controller = new CommonLifecycleApi(contentLifecycleParams)
controller.execute()