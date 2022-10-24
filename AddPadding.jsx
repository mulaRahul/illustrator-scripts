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


// * UI *
// root window
var dlg = new Window("dialog", "Add Padding");

// artboard options layout
var artboardOptionsContainer = dlg.add("group", undefined);
artboardOptionsContainer.alignment = ["left", "center"];

var allArtboardOption = artboardOptionsContainer.add("radiobutton", undefined, "All Artboards");
var customArtboardOption = artboardOptionsContainer.add("radiobutton", undefined, "Custom");
var customArtboardInput = artboardOptionsContainer.add("edittext", undefined, "0, 2, 4-6");

allArtboardOption.onClick = function () {
    customArtboardInput.enabled = false;
};
customArtboardOption.onClick = function () {
    customArtboardInput.enabled = true;
};

// method options layout
var methodOptionsContainer = dlg.add("group", undefined);
methodOptionsContainer.alignment = ["left", "center"];

methodOptionsContainer.add("statictext", undefined, "Method ");
var similarOption = methodOptionsContainer.add("radiobutton", undefined, "Similar");
var alternateOption = methodOptionsContainer.add("radiobutton", undefined, "Alternate");
alternateOption.helpTip = "Alternate between odd and even artboard number";

// alternate options input layout
var alternateOptionsContainer = dlg.add("group", undefined);
alternateOptionsContainer.orientation = "column";

var alternateOddContainer = alternateOptionsContainer.add("panel", undefined, "Odd");
alternateOddContainer.orientation = "row";
alternateOddContainer.add("statictext", undefined, "Left");
var oddLeftPadding = alternateOddContainer.add("edittext", undefined);
oddLeftPadding.minimumSize = [32, 0];
alternateOddContainer.add("statictext", undefined, "Right");
var oddRightPadding = alternateOddContainer.add("edittext", undefined);
oddRightPadding.minimumSize = [32, 0];

var alternateEvenContainer = alternateOptionsContainer.add("panel", undefined, "Even");
alternateEvenContainer.orientation = "row";
alternateEvenContainer.add("statictext", undefined, "Left");
var evenLeftPadding = alternateEvenContainer.add("edittext", undefined);
evenLeftPadding.minimumSize = [32, 0];
alternateEvenContainer.add("statictext", undefined, "Right");
var evenRightPadding = alternateEvenContainer.add("edittext", undefined);
evenRightPadding.minimumSize = [32, 0];

// alternateOptionsContainer visibility toggling
similarOption.onClick = function() {
    alternateOptionsContainer.enabled = false;
};

alternateOption.onClick = function() {
    alternateOptionsContainer.enabled = true;
};

// padding input
var paddingContainer = dlg.add("group", undefined);
paddingContainer.alignment = ["left", "center"];

paddingContainer.add("statictext", undefined, "Padding ");
var paddingAll = paddingContainer.add("edittext", undefined, "32");
paddingAll.minimumSize = [64, 0];
var unitOptions = paddingContainer.add("dropdownlist", undefined, ["pixels", "inches"]);

var directionalPadding = dlg.add("checkbox", undefined, "Different Paddings");
directionalPadding.alignment = ["left", "center"];

var directionalPaddingContainer = dlg.add("group", undefined);
directionalPaddingContainer.orientation = "column";

var uppperPaddingContainer = directionalPaddingContainer.add("group", undefined);
uppperPaddingContainer.orientation = "row";

uppperPaddingContainer.add("statictext", undefined, "Top ");
var topPadding = uppperPaddingContainer.add("edittext", undefined, "0");
topPadding.minimumSize = [32, 0];

uppperPaddingContainer.add("statictext", undefined, "Right ");
var rightPadding = uppperPaddingContainer.add("edittext", undefined, "0");
rightPadding.minimumSize = [32, 0];

var lowerPaddingContainer = directionalPaddingContainer.add("group", undefined);
lowerPaddingContainer.orientation = "row";

lowerPaddingContainer.add("statictext", undefined, "Left ");
var leftPadding = lowerPaddingContainer.add("edittext", undefined, "0");
leftPadding.minimumSize = [32, 0];

lowerPaddingContainer.add("statictext", undefined, "Bottom ");
var bottomPadding = lowerPaddingContainer.add("edittext", undefined, "0");
bottomPadding.minimumSize = [32, 0];

function toggleAllPaddingState() {
    if (directionalPadding.value) {
        topPadding.enabled = true;
        leftPadding.enabled = true;
        rightPadding.enabled = true;
        bottomPadding.enabled = true;

        paddingAll.enabled = false;

    } else {

        topPadding.enabled = false;
        leftPadding.enabled = false;
        rightPadding.enabled = false;
        bottomPadding.enabled = false;

        paddingAll.enabled = true;

    }
}

directionalPadding.onClick = toggleAllPaddingState;

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


var renderBtn = dlg.add("button", undefined, "Add Padding");
renderBtn.alignment = ["right", "center"];
renderBtn.onClick = renderPadding;
renderBtn.helpTip = "To the active illustrator document";


// default options selections
allArtboardOption.value = true;
customArtboardInput.enabled = false;
similarOption.value = true;
similarOption.onClick();
unitOptions.selection = "pixels";
directionalPadding.value = false;
toggleAllPaddingState();

dlg.show();