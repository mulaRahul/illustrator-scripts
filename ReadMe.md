# 🎨 Adobe Illustrator Scripts
These are some handy adobe illustrator scripts I've written for my own use and hope these can help you as well.

# 📥 Install the scripts
1. Download the archive and unzip the same. The folder contains the script files.
2. Select the script file/s (ending with `.jsx`) you want to use and place it in the Illustrator Scripts folder:
    - **OS X**: /Applications/Adobe Illustrator [*vers.*]/Presets.localized/en_GB/Scripts
    - **Windows (*32 bit*)**: C:\Program Files (x86)\Adobe\Adobe Illustrator [*vers.*]\Presets\en_GB\Scripts\
    - **Windows (*64 bit*)**: C:\Program Files\Adobe\Adobe Illustrator [*vers.*] (64 Bit)\Presets\en_GB\Scripts\
3. Restart illustrator.

# 🏃‍♂️ Run the scripts 
- Go to, **File** → **Scripts** → <***ScriptName***>.

    *or*

- Drag and drop the script file into illustrator.

# ✨ Scripts

## [AddMargin.jsx](/AddMargin.jsx)
Add margins as guides or rectangles to all/desired artboards.

![preview](/previews/AddMargin.gif)

## 🔧 How to use

1. Open your illustrator document.
2. Run the script, **File** → **Scripts** → **AddMargin.jsx**.
3. [*Optional*] By default, all the artboards will be affected.
   Alternatively, you can affect desired artboards by choosing
   the **Custom** option. Then input the custom number of artboards
   separated by a comma like '1, 3, 5' or a range of artboards
   like '1, 3, 5-8'.
4. [*Optional*] If you desire to add different margins for odd
   and even numbered artboards, then select the **Alternate**
   option. Then input the **Left** and **Right** margin for the
   **Odd** and **Even** numbered artboard respectively.
5. Input the margin value in the **Margin** text-field.
6. [*Optional*] Equal margins will be added in all the directions.
   Instead if you want to add different margins for different
   directions, then check the **Different margins** box, and input
   the margin values for top, left, right, and bottom.
7. You can choose between **Guide** or **Rectangle** (with black 
   stroke) for the margin type.
8. Finally to render the margins, press the **Add Margin** button.
   The margins will be created in a new layer called **Margin**.

---

## [AddPadding.jsx](/AddPadding.jsx)
Add padding around your content in an artboard (by increasing the artboard size).

![preview](/previews/AddPadding.gif)

## 🔧 How to use

1. Open your illustrator document.<br>
   [*Optional*] Rearrange your artboards to avoid overlapping.
   Select the **Artboard Tool** or press <kbd>Shift</kbd> + <kbd>O</kbd>.
   Then go to, **Properties** → **Quick Actions** → **Rearrange All**.
2. Run the script, **File** → **Scripts** → **AddPadding.jsx**.
3. [*Optional*] By default, all the artboards will be affected.
   Alternatively, you can affect desired artboards by choosing
   the **Custom** option. Then input the custom number of artboards
   separated by a comma like '1, 3, 5' or a range of artboards
   like '1, 3, 5-8'.
4. [*Optional*] If you desire to add different paddings for odd
   and even numbered artboards, then select the **Alternate**
   option. Then input the **Left** and **Right** padding for the
   **Odd** and **Even** numbered artboard respectively.
5. Input the padding value in the **Padding** text-field.
6. [*Optional*] Equal paddings will be added in all the directions.
   Instead if you want to add different paddings for different
   directions, then check the **Different paddings** box, and input
   the padding values for top, left, right, and bottom.
7. Finally to render the paddings, press the **Add Padding** button.

---

## Cheers 🍻