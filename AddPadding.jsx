// 📄 AddPadding.jsx
// Adobe Illustrator Script
// Add padding around your content in an artboard.
//
// ✨ Usage:
// 1. Open your illustrator document.
//    [Optional] Rearrange your artboards to avoid overlapping.
//    Select the "Artboard Tool" or press [Shift] + [O].
//    Then go to, Properties → Quick Actions → Rearrange All.
// 2. Run the script, File → Scripts → AddPadding.jsx.
// 3. [Optional] By default, all the artboards will be affected.
//    Alternatively, you can affect desired artboards by choosing
//    the "Custom" option. Then input the custom number of artboards
//    separated by a comma like '1, 3, 5' or a range of artboards
//    like '1, 3, 5-8'.
// 4. [Optional] If you desire to add different paddings for odd
//    and even numbered artboards, then select the "Alternate"
//    option. Then input the "Left" and "Right" padding for the
//    "Odd" and "Even" numbered artboard respectively.
// 5. Input the padding value in the "Padding" text-field.
// 6. [Optional] Equal paddings will be added in all the directions.
//    Instead if you want to add different paddings for different
//    directions, then check the "Different paddings" box, and input
//    the padding values for top, left, right, and bottom.
// 7. Finally to render the paddings, press the "Add Padding" button.
//
// Copyright © 2022 Rahul Mula
// https://github.com/mulaRahul
// This script is distributed under the MIT License.
// See the LICENSE file for details.


//@target illustrator
app.preferences.setBooleanPreference("ShowExternalJSXWarning", false);

// config data
var configData = {
    medic: 15,
    spacing: 10,
    fillAlignment: ["fill", "center"],
    leftAlignment: ["left", "center"],
};

// * UI * //
// root window
var dlg = new Window("dialog", "Add Padding");
dlg.alignChildren = ["fill", "fill"];

// artboard options layout
var artboardOptionsContainer = dlg.add("panel", undefined, "Artboards");
artboardOptionsContainer.orientation = "row";
artboardOptionsContainer.paddings = configData.medic;
artboardOptionsContainer.alignChildren = configData.fillAlignment;

var allArtboardOption = artboardOptionsContainer.add("radiobutton", undefined, "All");
var customArtboardOption = artboardOptionsContainer.add("radiobutton", undefined, "Custom");
var customArtboardInput = artboardOptionsContainer.add("edittext", undefined, "1, 3, 5-8");
customArtboardInput.minimumSize = [100, 0];

// disable/enable [customArtboardInput] text-field
allArtboardOption.onClick = function () {
    customArtboardInput.enabled = false;
};
customArtboardOption.onClick = function () {
    customArtboardInput.enabled = true;
};

// padding input
var paddingContainer = dlg.add("panel", undefined, "Padding");
paddingContainer.paddings = configData.medic;
paddingContainer.alignment = configData.fillAlignment;
paddingContainer.alignChildren = configData.leftAlignment;

var paddingRadiobuttonGroup = paddingContainer.add("group", undefined);
paddingRadiobuttonGroup.orientation = "column";
paddingRadiobuttonGroup.alignChildren = configData.leftAlignment;

var allPaddingWrapper = paddingRadiobuttonGroup.add("group", undefined);

var allPaddingBtn = allPaddingWrapper.add("radiobutton", undefined, "All");
var paddingAll = allPaddingWrapper.add("edittext", undefined);
paddingAll.minimumSize = [60, 0];
var unitOptions = allPaddingWrapper.add("dropdownlist", undefined, ["pixels", "inches"]);

var directionalPadding = paddingRadiobuttonGroup.add("radiobutton", undefined, "Directional");

// toggle radiobutton states
allPaddingBtn.onClick = function() {
    // radiobuttons
    this.value = true;
    directionalPadding.value = false;

    // edittexts
    topPadding.enabled = false;
    leftPadding.enabled = false;
    rightPadding.enabled = false;
    bottomPadding.enabled = false;

    paddingAll.enabled = true;

}
directionalPadding.onClick = function() {
    // radiobuttons
    this.value = true;
    allPaddingBtn.value = false;

    // edittexts
    topPadding.enabled = true;
    leftPadding.enabled = true;
    rightPadding.enabled = true;
    bottomPadding.enabled = true;

    paddingAll.enabled = false;
}

// directional padding
var directionalPaddingPanel = paddingContainer.add("group", undefined);
directionalPaddingPanel.orientation = "row";
directionalPaddingPanel.alignment = configData.leftAlignment;

// var directionalPadding = dlg.add("checkbox", undefined, "Different paddings");
// directionalPadding.alignment = configData.leftAlignment;;

var topWrapper = directionalPaddingPanel.add("group", undefined);
topWrapper.orientation = "column";
topWrapper.alignChildren = configData.leftAlignment;;

topWrapper.add("statictext", undefined, "Top ");
var topPadding = topWrapper.add("edittext", undefined, "0");
topPadding.minimumSize = [50, 0];

var rightWrapper = directionalPaddingPanel.add("group", undefined);
rightWrapper.orientation = "column";
rightWrapper.alignChildren = configData.leftAlignment;;

rightWrapper.add("statictext", undefined, "Right ");
var rightPadding = rightWrapper.add("edittext", undefined, "0");
rightPadding.minimumSize = [50, 0];

var leftWrapper = directionalPaddingPanel.add("group", undefined);
leftWrapper.orientation = "column";
leftWrapper.alignChildren = configData.leftAlignment;;

leftWrapper.add("statictext", undefined, "Left ");
var leftPadding = leftWrapper.add("edittext", undefined, "0");
leftPadding.minimumSize = [50, 0];

var bottomWrapper = directionalPaddingPanel.add("group", undefined);
bottomWrapper.orientation = "column";
bottomWrapper.alignChildren = configData.leftAlignment;;

bottomWrapper.add("statictext", undefined, "Bottom ");
var bottomPadding = bottomWrapper.add("edittext", undefined, "0");
bottomPadding.minimumSize = [50, 0];

// method options layout
var methodOptionsContainer = dlg.add("panel", undefined, "Method");
methodOptionsContainer.paddings = configData.medic;
methodOptionsContainer.alignChildren = configData.leftAlignment;

var methodOptionsWrapper = methodOptionsContainer.add("group", undefined);
methodOptionsWrapper.orientation = "row";

var similarOption = methodOptionsWrapper.add("radiobutton", undefined, "Similar");
similarOption.helpTip = "Same padding on all artboards";

var alternateOption = methodOptionsWrapper.add("radiobutton", undefined, "Alternate");
alternateOption.helpTip = "Alternate between odd and even numbered artboards";

// alternate options input layout
var alternateOddContainer = methodOptionsContainer.add("panel", undefined, "Odd");
alternateOddContainer.orientation = "row";
alternateOddContainer.paddings = configData.medic;
alternateOddContainer.alignment = configData.fillAlignment;
alternateOddContainer.alignChildren = configData.fillAlignment;

var alternateOddLeftWrapper = alternateOddContainer.add("group", undefined);

alternateOddLeftWrapper.add("statictext", undefined, "Left");
var oddLeftPadding = alternateOddLeftWrapper.add("edittext", undefined);
oddLeftPadding.minimumSize = [40, 0];

var alternateOddRightWrapper = alternateOddContainer.add("group", undefined);

alternateOddRightWrapper.add("statictext", undefined, "Right");
var oddRightPadding = alternateOddRightWrapper.add("edittext", undefined);
oddRightPadding.minimumSize = [40, 0];

var alternateEvenContainer = methodOptionsContainer.add("panel", undefined, "Even");
alternateEvenContainer.orientation = "row";
alternateEvenContainer.paddings = configData.medic;
alternateEvenContainer.alignment = configData.fillAlignment;
alternateEvenContainer.alignChildren = configData.fillAlignment;

var alternateEvenLeftWrapper = alternateEvenContainer.add("group", undefined);

alternateEvenLeftWrapper.add("statictext", undefined, "Left");
var evenLeftPadding = alternateEvenLeftWrapper.add("edittext", undefined);
evenLeftPadding.minimumSize = [40, 0];

var alternateEvenRightWrapper = alternateEvenContainer.add("group", undefined);

alternateEvenRightWrapper.add("statictext", undefined, "Right");
var evenRightPadding = alternateEvenRightWrapper.add("edittext", undefined);
evenRightPadding.minimumSize = [40, 0];

// [alternateOptionsContainer] visibility toggling
similarOption.onClick = function() {
    alternateEvenContainer.enabled = false;
    alternateOddContainer.enabled = false;
};

alternateOption.onClick = function() {
    alternateEvenContainer.enabled = true;
    alternateOddContainer.enabled = true;
};

// * Main Scripting * //

//utility functions
function contains(array, element) {
    return array.toString().indexOf( element.toString() ) !== -1;
}

function parseInputRange(query) {
    // takes string like "0, 2, 4 - 6" as query
    // and returns Array like [ 0, 2, 4, 5, 6 ]

    var lst = query.split(',');
    var newLst = [];
    
    for(var i = 0; i < lst.length; i++) {
        
        // remove spaces
        var val = lst[i].replace(" ", "");
        
        // if it's nested range parse it
        if(val.indexOf("-") !== -1) { 
            
            var _lst = val.split('-');

            var start = parseInt(_lst[0]);
            var end = parseInt(_lst[1]);

            for(var i = start; i <= end; i++) {

                newLst.push(i - 1);

            }

        } else {

            newLst.push(parseInt(val) - 1);

        }
    }
    
    return newLst;
}

function artboardAddPadding(allArtboards, idx, layer) {
    // adds padding to the artboard with given [idx]

    // padding calc
    var _paddingLeft = parseFloat(paddingAll.text);
    var _paddingTop = _paddingLeft;
    var _paddingRight = _paddingLeft;
    var _paddingBottom = _paddingLeft;

    if (directionalPadding.value) {
        
        // different paddings for different direction
        _paddingLeft = parseFloat(leftPadding.text);
        _paddingTop = parseFloat(topPadding.text);
        _paddingRight = parseFloat(rightPadding.text);
        _paddingBottom = parseFloat(bottomPadding.text);

    } 
    


    if (alternateOption.value) {

        if ((idx + 1) % 2 == 0) {

            // even index number means odd artboard number
            _paddingLeft = parseFloat(evenLeftPadding.text);
            _paddingRight = parseFloat(evenRightPadding.text);

        }
        else {

            // odd index number means even artboard number
            _paddingLeft = parseFloat(oddLeftPadding.text);
            _paddingRight = parseFloat(oddRightPadding.text);

        }

    }


    if (unitOptions.selection.text == "inches") {

        // unit conversion from inches to pixels
        // 1 in  = 72 px here
        _paddingLeft *= 72;
        _paddingRight *= 72;
        _paddingTop *= 72;
        _paddingBottom *= 72;

    }

    // points of the artboard
    var _left = allArtboards[idx].artboardRect[0];
    var _top = allArtboards[idx].artboardRect[1];
    var _right = allArtboards[idx].artboardRect[2];
    var _bottom = allArtboards[idx].artboardRect[3];

    allArtboards[idx].artboardRect = [
        _left - _paddingLeft,
        _top + _paddingTop,
        _right + _paddingRight,
        _bottom - _paddingBottom
    ];

}

function renderPadding() {

    // getting active document
    try {
        var curDoc = app.activeDocument;
    } catch (_) {
        alert ("No active illustrator document found. Please open one!", "Error");
        return;
    }

    // input params check
    var customArtboardLst;
    if (customArtboardOption.value) {
        var customArtboardLst = parseInputRange(customArtboardInput.text);
    }

    var allArtboards = curDoc.artboards;
    for(var idx = 0; idx < allArtboards.length; idx++) {
        
        // all artboards
        if (allArtboardOption.value) {
            
            artboardAddPadding(allArtboards, idx);
            
        }
        // custom artboards ... roundabout way as Array.indexOf() doesn't work
        else if (contains(customArtboardLst, idx)) {
            
            artboardAddPadding(allArtboards, idx);
            
        }
        
    }
    
    alert("Padding Added! Please close the dialog to view the result.", "Success");
}


// add padding button
var renderBtn = dlg.add("button", undefined, "Add Padding");
renderBtn.minimumSize = [0, 40];
renderBtn.onClick = renderPadding;
renderBtn.alignment = configData.fillAlignment;
renderBtn.helpTip = "to the active illustrator document";

// default options selections
allArtboardOption.value = true;
customArtboardInput.enabled = false;
similarOption.value = true;
similarOption.onClick();
unitOptions.selection = "pixels";
directionalPadding.value = false;
allPaddingBtn.onClick();

dlg.show();