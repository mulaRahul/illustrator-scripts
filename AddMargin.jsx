// 📄 AddMargin.jsx
// Adobe Illustrator Script
// Add margins as guides or rectangles to all/desired artboards.
//
// ✨ Usage:
// 1. Open your illustrator document.
// 2. Run the script, File → Scripts → AddMargin.jsx.
// 3. [Optional] By default, all the artboards will be affected.
//    Alternatively, you can affect desired artboards by choosing
//    the "Custom" option. Then input the custom number of artboards
//    separated by a comma like '1, 3, 5' or a range of artboards
//    like '1, 3, 5-8'.
// 4. [Optional] If you desire to add different margins for odd
//    and even numbered artboards, then select the "Alternate"
//    option. Then input the "Left" and "Right" margin for the
//    "Odd" and "Even" numbered artboard respectively.
// 5. Input the margin value in the "Margin" text-field.
// 6. [Optional] Equal margins will be added in all the directions.
//    Instead if you want to add different margins for different
//    directions, then check the "Different margins" box, and input
//    the margin values for top, left, right, and bottom.
// 7. You can choose between "Guide" or "Rectangle" (with black 
//    stroke) for the margin type.
// 8. Finally to render the margins, press the "Add Margin" button.
//    The margins will be created in a new layer called "Margin".

// Copyright © 2022 Rahul Mula
// https://github.com/mulaRahul
// This script is distributed under the MIT License.
// See the LICENSE file for details.


// * UI * //
// root window
var dlg = new Window("dialog", "Add Margin");

// artboard options layout
var artboardOptionsContainer = dlg.add("group", undefined);
artboardOptionsContainer.alignment = ["left", "center"];

var allArtboardOption = artboardOptionsContainer.add("radiobutton", undefined, "All Artboards");
var customArtboardOption = artboardOptionsContainer.add("radiobutton", undefined, "Custom");
var customArtboardInput = artboardOptionsContainer.add("edittext", undefined, "1, 3, 5-8");

// disable/enable [customArtboardInput] text-field
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
var oddLeftMargin = alternateOddContainer.add("edittext", undefined);
oddLeftMargin.minimumSize = [32, 0];
alternateOddContainer.add("statictext", undefined, "Right");
var oddRightMargin = alternateOddContainer.add("edittext", undefined);
oddRightMargin.minimumSize = [32, 0];

var alternateEvenContainer = alternateOptionsContainer.add("panel", undefined, "Even");
alternateEvenContainer.orientation = "row";
alternateEvenContainer.add("statictext", undefined, "Left");
var evenLeftMargin = alternateEvenContainer.add("edittext", undefined);
evenLeftMargin.minimumSize = [32, 0];
alternateEvenContainer.add("statictext", undefined, "Right");
var evenRightMargin = alternateEvenContainer.add("edittext", undefined);
evenRightMargin.minimumSize = [32, 0];

// [alternateOptionsContainer] visibility toggling
similarOption.onClick = function() {
    alternateOptionsContainer.enabled = false;
};

alternateOption.onClick = function() {
    alternateOptionsContainer.enabled = true;
};

// margin input
var marginContainer = dlg.add("group", undefined);
marginContainer.alignment = ["left", "center"];

marginContainer.add("statictext", undefined, "Margin ");
var marginAll = marginContainer.add("edittext", undefined, "32");
marginAll.minimumSize = [64, 0];
var unitOptions = marginContainer.add("dropdownlist", undefined, ["pixels", "inches"]);

var directionalMargin = dlg.add("checkbox", undefined, "Different margins");
directionalMargin.alignment = ["left", "center"];

var directionalMarginContainer = dlg.add("group", undefined);
directionalMarginContainer.orientation = "column";

var uppperMarginContainer = directionalMarginContainer.add("group", undefined);
uppperMarginContainer.orientation = "row";

uppperMarginContainer.add("statictext", undefined, "Top ");
var topMargin = uppperMarginContainer.add("edittext", undefined, "0");
topMargin.minimumSize = [32, 0];

uppperMarginContainer.add("statictext", undefined, "Right ");
var rightMargin = uppperMarginContainer.add("edittext", undefined, "0");
rightMargin.minimumSize = [32, 0];

var lowerMarginContainer = directionalMarginContainer.add("group", undefined);
lowerMarginContainer.orientation = "row";

lowerMarginContainer.add("statictext", undefined, "Left ");
var leftMargin = lowerMarginContainer.add("edittext", undefined, "0");
leftMargin.minimumSize = [32, 0];

lowerMarginContainer.add("statictext", undefined, "Bottom ");
var bottomMargin = lowerMarginContainer.add("edittext", undefined, "0");
bottomMargin.minimumSize = [32, 0];

function toggleAllMarginState() {
    // disable/enable allmargin text-fields
    if (directionalMargin.value) {
        topMargin.enabled = true;
        leftMargin.enabled = true;
        rightMargin.enabled = true;
        bottomMargin.enabled = true;

        marginAll.enabled = false;

    } else {
        topMargin.enabled = false;
        leftMargin.enabled = false;
        rightMargin.enabled = false;
        bottomMargin.enabled = false;

        marginAll.enabled = true;
    }
}

directionalMargin.onClick = toggleAllMarginState;

// margin type layout
var typeContainer = dlg.add("group", undefined);
typeContainer.alignment = ["left",  "center"];
typeContainer.add("statictext", undefined, "margin as ");

var asRect = typeContainer.add("radiobutton", undefined, "Rectangle");
var asGuide = typeContainer.add("radiobutton", undefined, "Guide");


// * Main Scripting * //

//utility consts
var blackColor = new CMYKColor();
blackColor.cyan = 0;
blackColor.magenta = 0;
blackColor.yellow = 0;
blackColor.black = 100;

//utility functions
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

function artboardAddMargin(allArtboards, idx, layer) {
    // adds margin to the artboard with given [idx]

    // margin calc
    var _marginLeft = parseFloat(marginAll.text);
    var _marginTop = _marginLeft;
    var _marginRight = _marginLeft;
    var _marginBottom = _marginLeft;

    if (directionalMargin.value) {
        
        // different margins for different direction
        _marginLeft = parseFloat(leftMargin.text);
        _marginTop = parseFloat(topMargin.text);
        _marginRight = parseFloat(rightMargin.text);
        _marginBottom = parseFloat(bottomMargin.text);

    } 
    


    if (alternateOption.value) {

        if ((idx + 1) % 2 == 0) {

            // even index number means odd artboard number
            _marginLeft = parseFloat(evenLeftMargin.text);
            _marginRight = parseFloat(evenRightMargin.text);

        }
        else {

            // odd index number means even artboard number
            _marginLeft = parseFloat(oddLeftMargin.text);
            _marginRight = parseFloat(oddRightMargin.text);

        }

    }


    if (unitOptions.selection.text == "inches") {

        // unit conversion from inches to pixels
        // 1 in  = 96 px
        _marginLeft *= 96;
        _marginRight *= 96;
        _marginTop *= 96;
        _marginBottom *= 96;

    }

    // points of the artboard
    var _left = allArtboards[idx].artboardRect[0];
    var _top = allArtboards[idx].artboardRect[1];
    var _right = allArtboards[idx].artboardRect[2];
    var _bottom = allArtboards[idx].artboardRect[3];

    // margin rectangle pos and size calc
    var _width = Math.abs(_right - _left) - (_marginLeft + _marginRight);
    var _height = Math.abs(_top - _bottom) - (_marginTop + _marginBottom);

    var _rect = layer.pathItems.rectangle(
        (_top - _marginTop), // top position
        (_left + _marginLeft), // left position
        _width, // rectangle width
        _height, // rectangle height
    );

    _rect.name = (idx + 1).toString();
    _rect.filled = false;

    if (asGuide.value) {

        // display margin as guide
        _rect.guides = true;

    } else {

        // display margin as rectangle
        _rect.stroked = true;
        _rect.strokeColor = blackColor;

    }
}

function renderMargin() {

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

    // margin options
    var marginLayer = curDoc.layers.add();
    marginLayer.name = "Margin";

    var allArtboards = curDoc.artboards;
    for(var idx = 0; idx < allArtboards.length; idx++) {
        
        // all artboards
        if (allArtboardOption.value) {
            
            artboardAddMargin(allArtboards, idx, marginLayer);
            
        }
        // custom artboards ... roundabout way as Array.indexOf() doesn't work
        else if (customArtboardLst.toString().indexOf( idx.toString() ) !== -1) {
            
            artboardAddMargin(allArtboards, idx, marginLayer);
            
        }
        
    }
    
    alert("Margins Added! Please close the dialog to view the result.", "Success");
}

// add margin button
var renderBtn = dlg.add("button", undefined, "Add Margin");
renderBtn.alignment = ["right", "center"];
renderBtn.onClick = renderMargin;
renderBtn.helpTip = "To the active illustrator document";


// default options selections
allArtboardOption.value = true;
customArtboardInput.enabled = false;
similarOption.value = true;
similarOption.onClick();
unitOptions.selection = "pixels";
directionalMargin.value = false;
toggleAllMarginState();
asGuide.value = true;

dlg.show();