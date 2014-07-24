'use strict';

/* Directives */

angular.module('backAnd.directives')
  .directive('myform', function ($sce) {
    return {
      restrict: 'A',
      transclude : false,
      template: '\
      <form role="form">\
        <div class="form-group" ng-repeat="field in formSchema.fields">\
          <hr ng-if="field.hr">\
          <div ng-bind-html="renderHtml(field.preLabel)"></div>\
          <label>{{field.name}}\
            <input type="text" class="form-control" placeholder="type: {{field.type}}">\
          </label>\
          <div ng-bind-html="renderHtml(field.postLabel)"></div>\
        </div>\
        <div>\
          <ul class="nav nav-tabs" role="tablist">\
            <li ng-repeat="category in formSchema.categories" ng-class="{active : $first}">\
              <a href="#{{category.catName}}" ng-click="toggleActive(category.catName, $event)" role="tab" data-toggle="tab">{{category.catName}}</a>\
            </li>\
          </ul>\
          <div class="tab-content">\
            <div class="tab-pane fade in" ng-class="{active : $first}" ng-repeat="category in formSchema.categories" id="{{category.catName}}">\
              <div class="form-group" ng-repeat="field in category.fields" style ="display: inline-block;width: {{100 / category.columnsInDialog * field.columns}}%;">\
                <hr ng-if="field.hr">\
                <div ng-bind-html="renderHtml(field.preLabel)"></div>\
                <label>{{field.name}}\
                  <input type="text" class="form-control" placeholder="type: {{field.type}}">\
                </label>\
                <div ng-bind-html="renderHtml(field.postLabel)"></div>\
              </div>\
            </div>\
          </div>\
        </div>\
        <button type="submit" class="btn btn-default">Submit</button>\
      </form>',
      link: function(scope, el, attrs) {
        var formSchema = {
          fields: [],
          categories: {}
        };
    
        function processForm(data) {
          angular.forEach(data.fields, function (field) {
            var f = {
              name : field.name,
              type : field.type,
              hr: field.addhorizontallineabouvethefield,
              columns: field.columnSpanInDialog,
              preLabel: field.preLabel,
              postLabel: field.postLabel
            };
            scope.renderHtml = function(html_code) {
              return $sce.trustAsHtml(html_code);
            };
            if (field.categoryName) {
              if (!formSchema.categories[field.categoryName]) {
                formSchema.categories[field.categoryName] = {
                  catName : field.categoryName,
                  fields: []
                };
              }
              formSchema.categories[field.categoryName].fields.push(f);
            } else {
              formSchema.fields.push(f);
            }
          })
          angular.forEach(data.categories, function (cat) {
            if (formSchema.categories[cat.name]) {
              formSchema.categories[cat.name].columnsInDialog = cat.columnsInDialog;
            }
          });
        };
        processForm(test1);
        console.log(formSchema)
        scope.formSchema = formSchema;
        scope.toggleActive = function(ind, $event){
          $event.preventDefault();
          el.find('a[href="#' + ind + '"]').tab('show');
        };
      }
    };
  });

var test1 = {
    "__metadata": {
        "id": "17"
    },
    "rowView": "Tabs",
    "captionText": "test1",
    "name": "test1",
    "newButtonName": "New",
    "dataDisplayType": "Table",
    "allowAdd": true,
    "databaseName": "test1",
    "newButtonDescription": "",
    "filterType": "Excel",
    "allowEdit": true,
    "editButtonName": "Edit",
    "sortingType": "Excel",
    "allowDuplicate": true,
    "cardsItemHeight(px)": "",
    "cardsItemWidth(px)": "",
    "columnsWidth": "BasedOnColumnWidth",
    "rowHeight[Pixels]": "",
    "editButtonDescription": "",
    "allowDelete": true,
    "enableTableDisplay": false,
    "controller": "Home",
    "multiSelect": false,
    "duplicateButtonName": "Duplicate",
    "rowsperPage": 20,
    "enableCardsDisplay": false,
    "indexAction": "Index",
    "duplicateButtonDescription": "",
    "hideFilter": false,
    "enablePreviewDisplay": false,
    "checkListAction": "CheckList",
    "promoteButtonName": "Promote",
    "hideSearchBox": false,
    "groupFilterDisplayLabel": false,
    "openasPopup": true,
    "refreshOnClose": false,
    "setLanguageAction": "SetLanguage",
    "cachetheTab": true,
    "promoteButtonDescription": "",
    "hideToolbar": false,
    "createAction": "Create",
    "addItemsButtonName": "",
    "hasChildrenRow": false,
    "hideFooter": false,
    "refreshAction": "Refresh",
    "addItemsButtonDescription": "",
    "createOnlyAction": "CreateOnly",
    "deleteButtonName": "Delete",
    "useOrderForCreate": false,
    "editAction": "Edit",
    "insertButtonName": "Insert",
    "useOrderForEdit": false,
    "duplicateAction": "Duplicate",
    "exportToExcel": true,
    "editRichAction": "EditRich",
    "importFromExcel": true,
    "background": "",
    "getRichAction": "GetRich",
    "editOnlyAction": "EditOnly",
    "showPrint": false,
    "getJsonViewAction": "GetJsonView",
    "getSelectListAction": "GetSelectList",
    "text": "",
    "inlineAddingDialogAction": "InlineAddingDialog",
    "inlineEditingDialogAction": "InlineEditingDialog",
    "inlineAddingCreateAction": "InlineAddingCreate",
    "inlineEditingEditAction": "InlineEditingEdit",
    "inlineDuplicateDialogAction": "InlineDuplicateDialog",
    "inlineDuplicateAction": "InlineDuplicate",
    "inlineSearchDialogAction": "InlineSearchDialog",
    "deleteAction": "Delete",
    "deleteSelectionAction": "DeleteSelection",
    "editSelectionAction": "EditSelection",
    "filterAction": "Filter",
    "allFilterValuesAction": "GetAllFilterValues",
    "uploadAction": "Upload",
    "exportToCsvAction": "ExportToCsv",
    "printAction": "Print",
    "autoCompleteAction": "AutoComplete",
    "autoCompleteController": "Home",
    "anotherRowLinkText": "",
    "anotherRowLinkFunction": "",
    "javaScripts": "",
    "styleSheets": "",
    "showUpDown": false,
    "historyNotifyList": "",
    "maxSubGridHeight": 400,
    "reloadPage": "Ajax",
    "treeType": "Adjacency",
    "treeViewName": "",
    "treeRelatedFieldName": "",
    "treeRoot": "",
    "workFlowStepsFieldName": "",
    "columnsInDialogPerCategory": "",
    "showDisabledSteps": false,
    "baseView": "",
    "duplicationMethod": "Shallow",
    "duplicateMessage": "",
    "counterBaseTableName": "",
    "containerGraphic": "",
    "notificationMessageKey": "",
    "notificationSubjectKey": "",
    "isImageTable": false,
    "ordinalColumnName": "",
    "rowColorColumnName": "",
    "imageSrcColumnName": "Image",
    "groupingFields": "",
    "cacheinMemory": false,
    "addItemsFieldName": "",
    "createDateColumnName": "CreateDate",
    "modifiedDateColumnName": "ModifiedDate",
    "createdByColumnName": "CreateUserId",
    "modifiedByColumnName": "ModifiedUserId",
    "baseViewName": "",
    "displayType": "Table",
    "message": "",
    "xmlElement": "",
    "createOverrideByWorkflow": false,
    "deleteOverrideByWorkflow": false,
    "inAddItemsaddAllItems": false,
    "fields": [{
        "__metadata": {
            "id": "161"
        },
        "columnSpanInDialog": 1,
        "displayName": "monkeys",
        "textAlignment": "inherit",
        "name": "monkeys",
        "order": 40,
        "displayColumnTitle": true,
        "databaseName": "Id",
        "hideFilter": false,
        "orderForCreate": 40,
        "required": false,
        "type": "MultiSelect",
        "disableInFilter": false,
        "orderForEdit": 40,
        "hideInCreate": true,
        "displayFormat": "Grid",
        "relatedViewName": "monkeys",
        "hideInEdit": true,
        "defaultValue": "",
        "disableInEdit": false,
        "enableSort": "",
        "hideHyperlink": true,
        "donotDisplayinGrid": true,
        "disableInCreate": false,
        "minimumValue": 0,
        "gridEditable": true,
        "includeInDuplicate": false,
        "maximumValue": 0,
        "disableInDuplicate": false,
        "tooltip": "",
        "searchable": false,
        "groupFilterDisplayLabel": "Inherit",
        "addhorizontallineabouvethefield": false,
        "seperatorTitle": "",
        "preLabel": "",
        "postLabel": "",
        "editInTableView": false,
        "gridCSSClass": "d_fieldContainer",
        "groupFilterWidth": 80,
        "fieldType": "Children",
        "allowDuplication": true,
        "preventCacheonTab": false,
        "hideInDerivation": false,
        "attributesNames": "",
        "exportToXml": true,
        "specialColumn": "None",
        "dependenciesData": "",
        "isUnique": false,
        "mustMatchAutocomplete": "StartsWith",
        "autocompleteFilter": false,
        "containerGraphicField": "",
        "nullString": "",
        "hideInTableMobile": false,
        "updateParentInGrid": false,
        "minWidth": 80,
        "import": true,
        "tableCellMinWidth": 0,
        "labelContentLayout": "Horizontal",
        "refresh": false,
        "uniqueforDuplicate": false,
        "partFromUniqueIndex": false,
        "saveHistory": true,
        "searchFilter": "",
        "format": "",
        "cloneViewName": "",
        "originalFieldName": "FK_test1_monkeys_Children",
        "originalParentRelatedFieldName": "",
        "dependencyFieldName": "",
        "insideTriggerFieldName": "",
        "checkListInTableLimit": 0,
        "xmlElement": "",
        "counterInitiated": false,
        "subGridExport": false,
        "subGridPlacement": 0,
        "subgridInstructions": "To add new {0}, Please fill the required fields and save it first",
        "updateParent": "No",
        "counter": false,
        "includeinWordtemplate": false,
        "relatedParentFieldName": "FK_test1_monkeys_Parent",
        "categoryName": ""
    }, {
        "__metadata": {
            "id": "146"
        },
        "columnSpanInDialog": 1,
        "displayName": "Id",
        "textAlignment": "inherit",
        "name": "Id",
        "order": 1010,
        "displayColumnTitle": true,
        "databaseName": "Id",
        "hideFilter": false,
        "orderForCreate": 10,
        "required": true,
        "type": "Numeric",
        "disableInFilter": false,
        "orderForEdit": 10,
        "hideInCreate": false,
        "displayFormat": "None",
        "booleanHtmlControlType": "Check",
        "relatedViewName": "",
        "hideInEdit": false,
        "defaultValue": "",
        "textHtmlControlType": "Text",
        "disableInEdit": false,
        "enableSort": true,
        "radioOrientation": "Horizontal",
        "hideHyperlink": true,
        "donotDisplayinGrid": true,
        "disableInCreate": false,
        "minimumValue": -2147483648,
        "rich": false,
        "gridEditable": true,
        "includeInDuplicate": true,
        "maximumValue": 2147483647,
        "browserAutocomplete": true,
        "disableInDuplicate": false,
        "tooltip": "",
        "searchable": true,
        "richeditongrid": true,
        "groupFilterDisplayLabel": "Inherit",
        "addhorizontallineabouvethefield": false,
        "longtextlength(letters)": 50,
        "seperatorTitle": "",
        "preLabel": "",
        "postLabel": "",
        "editInTableView": false,
        "gridCSSClass": "d_fieldContainer",
        "enumType": "",
        "groupFilterWidth": 80,
        "fieldType": "Column",
        "autocompleteColumn": "",
        "autocompleteTable": "",
        "autocompleteSql": "",
        "dropDownDisplayField": "",
        "hideInDerivation": false,
        "dropDownValueField": "",
        "trimSpaces": true,
        "custom": false,
        "dropDownParentViewName": "",
        "multiValueAdditionals": "",
        "encrypt": false,
        "encrypted": false,
        "certificateName": "",
        "symmetricKeyName": "",
        "symmetricKeyAlgorithm": "DES",
        "attributesNames": "",
        "exportToXml": true,
        "specialColumn": "None",
        "dependenciesData": "",
        "isUnique": false,
        "mustMatchAutocomplete": "StartsWith",
        "autocompleteFilter": false,
        "containerGraphicField": "",
        "nullString": "",
        "hideInTableMobile": false,
        "updateParentInGrid": false,
        "minWidth": 0,
        "import": true,
        "tableCellMinWidth": 0,
        "labelContentLayout": "Horizontal",
        "refresh": false,
        "uniqueforDuplicate": false,
        "partFromUniqueIndex": false,
        "saveHistory": true,
        "searchFilter": "",
        "format": "",
        "cloneViewName": "",
        "originalFieldName": "Column",
        "originalParentRelatedFieldName": "",
        "categoryName": "General"
    }, {
        "__metadata": {
            "id": "147"
        },
        "columnSpanInDialog": 1,
        "displayName": "מרכז רפואי",
        "textAlignment": "inherit",
        "name": "מרכז_רפואי",
        "order": 1020,
        "displayColumnTitle": true,
        "databaseName": "מרכז_רפואי",
        "hideFilter": false,
        "orderForCreate": 20,
        "required": false,
        "type": "ShortText",
        "disableInFilter": false,
        "orderForEdit": 20,
        "hideInCreate": true,
        "displayFormat": "None",
        "booleanHtmlControlType": "Check",
        "relatedViewName": "",
        "hideInEdit": true,
        "defaultValue": "",
        "textHtmlControlType": "Text",
        "disableInEdit": false,
        "enableSort": true,
        "radioOrientation": "Horizontal",
        "hideHyperlink": true,
        "donotDisplayinGrid": true,
        "disableInCreate": false,
        "minimumValue": 0,
        "rich": false,
        "gridEditable": true,
        "includeInDuplicate": true,
        "maximumValue": 0,
        "browserAutocomplete": true,
        "disableInDuplicate": false,
        "tooltip": "",
        "searchable": true,
        "richeditongrid": true,
        "groupFilterDisplayLabel": "Inherit",
        "addhorizontallineabouvethefield": false,
        "longtextlength(letters)": 50,
        "seperatorTitle": "",
        "preLabel": "",
        "postLabel": "",
        "editInTableView": false,
        "gridCSSClass": "d_fieldContainer",
        "enumType": "",
        "groupFilterWidth": 80,
        "fieldType": "Column",
        "autocompleteColumn": "",
        "autocompleteTable": "",
        "autocompleteSql": "",
        "dropDownDisplayField": "",
        "hideInDerivation": false,
        "dropDownValueField": "",
        "trimSpaces": true,
        "custom": false,
        "dropDownParentViewName": "",
        "multiValueAdditionals": "",
        "encrypt": false,
        "encrypted": false,
        "certificateName": "",
        "symmetricKeyName": "",
        "symmetricKeyAlgorithm": "DES",
        "attributesNames": "",
        "exportToXml": true,
        "specialColumn": "None",
        "dependenciesData": "",
        "isUnique": false,
        "mustMatchAutocomplete": "StartsWith",
        "autocompleteFilter": false,
        "containerGraphicField": "",
        "nullString": "",
        "hideInTableMobile": false,
        "updateParentInGrid": false,
        "minWidth": 0,
        "import": true,
        "tableCellMinWidth": 0,
        "labelContentLayout": "Horizontal",
        "refresh": false,
        "uniqueforDuplicate": false,
        "partFromUniqueIndex": false,
        "saveHistory": true,
        "searchFilter": "",
        "format": "",
        "cloneViewName": "",
        "originalFieldName": "Column",
        "originalParentRelatedFieldName": "",
        "categoryName": "General"
    }, {
        "__metadata": {
            "id": "148"
        },
        "columnSpanInDialog": 1,
        "displayName": "ישוב",
        "textAlignment": "inherit",
        "name": "ישוב",
        "order": 1030,
        "displayColumnTitle": true,
        "databaseName": "ישוב",
        "hideFilter": false,
        "orderForCreate": 30,
        "required": false,
        "type": "ShortText",
        "disableInFilter": false,
        "orderForEdit": 30,
        "hideInCreate": true,
        "displayFormat": "None",
        "booleanHtmlControlType": "Check",
        "relatedViewName": "",
        "hideInEdit": true,
        "defaultValue": "",
        "textHtmlControlType": "Text",
        "disableInEdit": false,
        "enableSort": true,
        "radioOrientation": "Horizontal",
        "hideHyperlink": true,
        "donotDisplayinGrid": true,
        "disableInCreate": false,
        "minimumValue": 0,
        "rich": false,
        "gridEditable": true,
        "includeInDuplicate": true,
        "maximumValue": 0,
        "browserAutocomplete": true,
        "disableInDuplicate": false,
        "tooltip": "",
        "searchable": true,
        "richeditongrid": true,
        "groupFilterDisplayLabel": "Inherit",
        "addhorizontallineabouvethefield": false,
        "longtextlength(letters)": 50,
        "seperatorTitle": "",
        "preLabel": "",
        "postLabel": "",
        "editInTableView": false,
        "gridCSSClass": "d_fieldContainer",
        "enumType": "",
        "groupFilterWidth": 80,
        "fieldType": "Column",
        "autocompleteColumn": "",
        "autocompleteTable": "",
        "autocompleteSql": "",
        "dropDownDisplayField": "",
        "hideInDerivation": false,
        "dropDownValueField": "",
        "trimSpaces": true,
        "custom": false,
        "dropDownParentViewName": "",
        "multiValueAdditionals": "",
        "encrypt": false,
        "encrypted": false,
        "certificateName": "",
        "symmetricKeyName": "",
        "symmetricKeyAlgorithm": "DES",
        "attributesNames": "",
        "exportToXml": true,
        "specialColumn": "None",
        "dependenciesData": "",
        "isUnique": false,
        "mustMatchAutocomplete": "StartsWith",
        "autocompleteFilter": false,
        "containerGraphicField": "",
        "nullString": "",
        "hideInTableMobile": false,
        "updateParentInGrid": false,
        "minWidth": 0,
        "import": true,
        "tableCellMinWidth": 0,
        "labelContentLayout": "Horizontal",
        "refresh": false,
        "uniqueforDuplicate": false,
        "partFromUniqueIndex": false,
        "saveHistory": true,
        "searchFilter": "",
        "format": "",
        "cloneViewName": "",
        "originalFieldName": "Column",
        "originalParentRelatedFieldName": "",
        "categoryName": "General"
    }, {
        "__metadata": {
            "id": "149"
        },
        "columnSpanInDialog": 1,
        "displayName": "עיר",
        "textAlignment": "inherit",
        "name": "עיר",
        "order": 1040,
        "displayColumnTitle": true,
        "databaseName": "עיר",
        "hideFilter": false,
        "orderForCreate": 40,
        "required": false,
        "type": "ShortText",
        "disableInFilter": false,
        "orderForEdit": 40,
        "hideInCreate": true,
        "displayFormat": "None",
        "booleanHtmlControlType": "Check",
        "relatedViewName": "",
        "hideInEdit": true,
        "defaultValue": "",
        "textHtmlControlType": "Text",
        "disableInEdit": false,
        "enableSort": true,
        "radioOrientation": "Horizontal",
        "hideHyperlink": true,
        "donotDisplayinGrid": true,
        "disableInCreate": false,
        "minimumValue": 0,
        "rich": false,
        "gridEditable": true,
        "includeInDuplicate": true,
        "maximumValue": 0,
        "browserAutocomplete": true,
        "disableInDuplicate": false,
        "tooltip": "",
        "searchable": true,
        "richeditongrid": true,
        "groupFilterDisplayLabel": "Inherit",
        "addhorizontallineabouvethefield": false,
        "longtextlength(letters)": 50,
        "seperatorTitle": "",
        "preLabel": "",
        "postLabel": "",
        "editInTableView": false,
        "gridCSSClass": "d_fieldContainer",
        "enumType": "",
        "groupFilterWidth": 80,
        "fieldType": "Column",
        "autocompleteColumn": "",
        "autocompleteTable": "",
        "autocompleteSql": "",
        "dropDownDisplayField": "",
        "hideInDerivation": false,
        "dropDownValueField": "",
        "trimSpaces": true,
        "custom": false,
        "dropDownParentViewName": "",
        "multiValueAdditionals": "",
        "encrypt": false,
        "encrypted": false,
        "certificateName": "",
        "symmetricKeyName": "",
        "symmetricKeyAlgorithm": "DES",
        "attributesNames": "",
        "exportToXml": true,
        "specialColumn": "None",
        "dependenciesData": "",
        "isUnique": false,
        "mustMatchAutocomplete": "StartsWith",
        "autocompleteFilter": false,
        "containerGraphicField": "",
        "nullString": "",
        "hideInTableMobile": false,
        "updateParentInGrid": false,
        "minWidth": 0,
        "import": true,
        "tableCellMinWidth": 0,
        "labelContentLayout": "Horizontal",
        "refresh": false,
        "uniqueforDuplicate": false,
        "partFromUniqueIndex": false,
        "saveHistory": true,
        "searchFilter": "",
        "format": "",
        "cloneViewName": "",
        "originalFieldName": "Column",
        "originalParentRelatedFieldName": "",
        "categoryName": "General"
    }],
    "categories": [{
        "name": "General",
        "columnsInDialog": 2
    }, {
        "name": "monkeys",
        "columnsInDialog": 2
    }]
};
