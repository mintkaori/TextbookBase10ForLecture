"use strict";
var upred;
(function (upred) {
    var ui;
    (function (ui) {
        ui.penColors = [
            '#E74C3C',
            '#E67E22',
            '#F1C40F',
            '#27AE60',
            '#3498DB',
            '#2980B9',
            '#8E44AD',
            '#943126',
            '#935116',
            '#9A7D0A',
            '#196F3D',
            '#21618C',
            '#1A5276',
            '#5B2C6F',
            '#FDFEFE',
            '#CCD1D1',
            '#7F8C8D',
            '#424949',
            '#17202A'
        ];
    })(ui = upred.ui || (upred.ui = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var ui;
    (function (ui) {
        var HTML = (function () {
            function HTML() {
            }
            HTML.id = function (id) {
                var tag = document.getElementById(id);
                return tag !== null && tag !== void 0 ? tag : undefined;
            };
            HTML.newNode = function (tagname) {
                return document.createElement(tagname);
            };
            HTML.newNodeStyled = function (tagname, style, classname) {
                var tag = document.createElement(tagname);
                if (classname !== undefined)
                    tag.className = classname;
                HTML.setStyle(tag, style);
                return tag;
            };
            HTML.newDivStyled = function (style, classname) {
                var div = document.createElement('div');
                if (classname !== undefined)
                    div.className = classname;
                HTML.setStyle(div, style);
                return div;
            };
            HTML.newText = function (text) {
                return document.createTextNode(text);
            };
            HTML.setStyle = function (node, style) {
                for (var key in style) {
                    if (style.hasOwnProperty(key)) {
                        node.style[key] = style[key];
                    }
                }
            };
            HTML.setAttr = function (node, values) {
                for (var key in values) {
                    if (values.hasOwnProperty(key)) {
                        node.setAttribute(key, values[key]);
                    }
                }
            };
            HTML.removeAllChildrenOf = function (node) {
                while (node.firstChild !== null && node.firstChild !== undefined)
                    node.removeChild(node.firstChild);
            };
            HTML.applyPosition = function (tag, sizeobj) {
                HTML.setStyle(tag, {
                    position: 'absolute',
                    left: sizeobj.x + 'px',
                    top: sizeobj.y + 'px',
                    width: sizeobj.w + 'px',
                    height: sizeobj.h + 'px',
                });
            };
            HTML.moveElements = function (from, to) {
                while (to.firstChild)
                    to.removeChild(to.firstChild);
                while (from.firstChild)
                    to.appendChild(from.firstChild);
            };
            HTML.moveToFront = function (el, back) {
                if (!el.parentNode)
                    return;
                var p = el.parentNode;
                p.insertBefore(el, back);
            };
            HTML.insertFirstAt = function (div, el) {
                if (div.firstChild) {
                    div.insertBefore(el, div.firstChild);
                }
                else {
                    div.appendChild(el);
                }
            };
            HTML.getXY = function (el) {
                var rect = el.getBoundingClientRect();
                return {
                    x: rect.left + window.scrollX,
                    y: rect.top + window.scrollY,
                    w: rect.width,
                    h: rect.height,
                };
            };
            return HTML;
        }());
        ui.HTML = HTML;
    })(ui = upred.ui || (upred.ui = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var ui;
    (function (ui) {
        var ScreenUtil = (function () {
            function ScreenUtil() {
            }
            ScreenUtil.GetScreenWidth = function () {
                return window.innerWidth;
            };
            ScreenUtil.GetScreenHeight = function () {
                return window.innerHeight;
            };
            return ScreenUtil;
        }());
        ui.ScreenUtil = ScreenUtil;
    })(ui = upred.ui || (upred.ui = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var ui;
    (function (ui) {
        var DrawingCanvas = (function () {
            function DrawingCanvas() {
                this.mode = 0;
                this.thickness = '2';
                this.color = '#C0392B';
                this.nowDrawing = false;
                this.nowMovingText = null;
                this.oldX = 0;
                this.oldY = 0;
                this.oldTX = 0;
                this.oldTY = 0;
                this.nowInput = false;
                this.buttonTextInput = null;
                this.canvasTag = ui.HTML.newNode('canvas');
                this.canvasTag.width = ui.ScreenUtil.GetScreenWidth();
                this.canvasTag.height = ui.ScreenUtil.GetScreenHeight();
                this.canvasTag.style.position = 'absolute';
                this.canvasTag.style.left = '0px';
                this.canvasTag.style.top = '0px';
                this.canvasTag.style.zIndex = '700';
                this.canvasTag.style.touchAction = 'none';
                this.canvasTag.style.cursor = 'crosshair';
                document.getElementById('WORKAREA').appendChild(this.canvasTag);
                this.textCanvas = ui.HTML.newDivStyled({
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    width: '100%',
                    height: '100%',
                    zIndex: '701',
                    overflow: 'hidden',
                });
                document.getElementById('WORKAREA').appendChild(this.textCanvas);
                var g = this.canvasTag.getContext('2d');
                if (g != null)
                    this.gfx = g;
                window.addEventListener('resize', this.OnResizeWindow.bind(this));
                window.addEventListener('mousedown', this.OnMouseDown.bind(this));
                window.addEventListener('touchstart', this.OnMouseDown.bind(this));
                window.addEventListener('mouseup', this.OnMouseUp.bind(this));
                window.addEventListener('mouseout', this.OnMouseUp.bind(this));
                window.addEventListener('touchend', this.OnMouseUp.bind(this));
                window.addEventListener('touchmove', this.OnMouseMove.bind(this));
                window.addEventListener('mousemove', this.OnMouseMove.bind(this));
            }
            DrawingCanvas.prototype.OnResizeWindow = function () {
                this.canvasTag.width = ui.ScreenUtil.GetScreenWidth();
                this.canvasTag.height = ui.ScreenUtil.GetScreenHeight();
            };
            DrawingCanvas.prototype.TextOn = function () {
                this.mode = 3;
                this.canvasTag.style.zIndex = '700';
                this.nowInput = false;
                this.canvasTag.style.cursor = 'text';
                this.textCanvas.style.cursor = 'text';
            };
            DrawingCanvas.prototype.TextOff = function () {
                this.mode = 0;
                this.canvasTag.style.zIndex = '700';
                this.canvasTag.style.cursor = 'initial';
                this.textCanvas.style.cursor = 'initial';
            };
            DrawingCanvas.prototype.PenOn = function () {
                this.mode = 1;
                this.canvasTag.style.zIndex = '702';
                this.canvasTag.style.cursor = 'crosshair';
                this.textCanvas.style.cursor = 'crosshair';
            };
            DrawingCanvas.prototype.PenOff = function () {
                this.mode = 0;
                this.canvasTag.style.zIndex = '700';
                this.canvasTag.style.cursor = 'initial';
                this.textCanvas.style.cursor = 'initial';
            };
            DrawingCanvas.prototype.EraserOn = function () {
                this.mode = 2;
                this.canvasTag.style.zIndex = '702';
                this.canvasTag.style.cursor = 'url(../common/asset/cursor_eraser.cur),auto';
                this.textCanvas.style.cursor = 'url(../common/asset/cursor_eraser.cur),auto';
            };
            DrawingCanvas.prototype.EraserOff = function () {
                this.mode = 0;
                this.canvasTag.style.zIndex = '700';
                this.canvasTag.style.cursor = 'initial';
                this.textCanvas.style.cursor = 'initial';
            };
            DrawingCanvas.prototype.SetColor = function (c) {
                this.color = c;
            };
            DrawingCanvas.prototype.SetThickness = function (t) {
                this.thickness = t;
            };
            DrawingCanvas.prototype.ClearAll = function () {
                if (!this.gfx)
                    return;
                this.gfx.clearRect(0, 0, this.canvasTag.width, this.canvasTag.height);
                while (this.textCanvas.firstChild) {
                    this.textCanvas.removeChild(this.textCanvas.firstChild);
                }
            };
            DrawingCanvas.prototype.OnMouseDown = function (e) {
                var _a, _b;
                if (e.target == this.textCanvas && this.mode == 0) {
                    (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                    (_b = upred.ui.mathModule) === null || _b === void 0 ? void 0 : _b.EnableInteraction();
                    return;
                }
                if (this.mode == 0) {
                    if (e.target.className == 'defTextMoveBt') {
                        this.OnStartMoveTextBt(e);
                        return;
                    }
                }
                if (e.target != this.canvasTag && e.target != this.textCanvas)
                    return;
                if (!this.gfx)
                    return;
                if (e.type == 'touchstart') {
                    this.oldX = e.targetTouches[0].pageX;
                    this.oldY = e.targetTouches[0].pageY;
                }
                else {
                    this.oldX = e.pageX;
                    this.oldY = e.pageY;
                }
                if (this.mode != 3) {
                    this.nowDrawing = true;
                }
            };
            DrawingCanvas.prototype.GetMode = function () {
                return this.mode;
            };
            DrawingCanvas.prototype.MakeNewTextInput = function () {
                if (this.nowInput)
                    return;
                var inputcont = ui.HTML.newNode('div');
                inputcont.className = 'defTextInputContainer';
                inputcont.style.position = 'absolute';
                inputcont.style.left = this.oldX - 10 + 'px';
                inputcont.style.top = this.oldY - 4 + 'px';
                var tinput = ui.HTML.newNode('span');
                tinput.className = 'defTextInput';
                tinput.role = 'textbox';
                tinput.contentEditable = 'true';
                tinput.style.position = 'absolute';
                tinput.style.left = '0px';
                tinput.style.top = '0px';
                tinput.style.zIndex = '90005';
                var movebt = ui.HTML.newNode('button');
                movebt.className = 'defTextMoveBt';
                movebt.style.opacity = '1';
                inputcont.appendChild(tinput);
                inputcont.appendChild(movebt);
                inputcont.rotateHandler = this.RotateText.bind(this);
                inputcont.deleteHandler = this.DeleteText.bind(this);
                inputcont.duplicateHandler = this.DuplicateText.bind(this);
                inputcont.highlighter = this.HighlightText.bind(this);
                this.textCanvas.appendChild(inputcont);
                tinput.focus();
                tinput.onfocus = this.OnTextFocused.bind(this);
                tinput.onblur = this.OnTextChanged.bind(this);
                this.nowInput = true;
                if (this.buttonTextInput != null &&
                    this.buttonTextInput.RestoreState) {
                    this.buttonTextInput.RestoreState();
                    this.TextOff();
                }
            };
            DrawingCanvas.prototype.HighlightText = function (item, flag) {
                var _a, _b;
                if (flag) {
                    item.firstChild.style.border = 'black 1px solid';
                    item.lastChild.style.zIndex = '90095';
                    item.lastChild.style.opacity = '1';
                    (_a = upred.ui.mathModule) === null || _a === void 0 ? void 0 : _a.DisableInteraction();
                }
                else {
                    item.firstChild.style.border = 'none';
                    item.lastChild.style.zIndex = '';
                    item.lastChild.style.opacity = '0';
                    (_b = upred.ui.mathModule) === null || _b === void 0 ? void 0 : _b.EnableInteraction();
                }
            };
            DrawingCanvas.prototype.RotateText = function (item, degree) {
                var rot = 0;
                if (item.ROTATEDEGREE)
                    rot = item.ROTATEDEGREE;
                rot += degree;
                item.style.transform = 'rotate(' + rot + 'deg)';
                item.ROTATEDEGREE = rot;
            };
            DrawingCanvas.prototype.DeleteText = function (item) {
                var _a;
                (_a = item.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(item);
            };
            DrawingCanvas.prototype.DuplicateText = function (item) {
                var _a, _b;
                var dup = item.cloneNode(true);
                (_a = item.parentNode) === null || _a === void 0 ? void 0 : _a.appendChild(dup);
                var xy = item.getBoundingClientRect();
                dup.style.left = xy.left + 10 + 'px';
                dup.style.top = xy.top + xy.height + 'px';
                dup.rotateHandler = this.RotateText.bind(this);
                dup.deleteHandler = this.DeleteText.bind(this);
                dup.duplicateHandler = this.DuplicateText.bind(this);
                dup.highlighter = this.HighlightText.bind(this);
                dup.firstChild.onfocus = this.OnTextFocused.bind(this);
                dup.firstChild.onblur = this.OnTextChanged.bind(this);
                (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.duplicated.push(dup);
            };
            DrawingCanvas.prototype.OnStartMoveTextBt = function (e) {
                if (e.target != null && e.target.className == 'defTextMoveBt') {
                    var bt = e.target;
                    var container = bt.parentNode;
                    var pos = container.getBoundingClientRect();
                    this.oldTX = pos.left;
                    this.oldTY = pos.top;
                    if (e.type == 'touchstart') {
                        this.oldX = e.targetTouches[0].pageX;
                        this.oldY = e.targetTouches[0].pageY;
                    }
                    else {
                        this.oldX = e.pageX;
                        this.oldY = e.pageY;
                    }
                    this.nowMovingText = container;
                }
            };
            DrawingCanvas.prototype.SetSelectionBy = function (x, y, w, h) {
                var _a;
                var added = false;
                for (var i = 0; i < this.textCanvas.children.length; i++) {
                    var tdiv = this.textCanvas.children[i];
                    if (tdiv.className != 'defTextInputContainer')
                        continue;
                    var s = tdiv.getBoundingClientRect();
                    if (!(x > s.right ||
                        x + w < s.left ||
                        y > s.bottom ||
                        y + h < s.top)) {
                        (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemAdd(tdiv);
                        added = true;
                    }
                }
            };
            DrawingCanvas.prototype.OnTextFocused = function (e) {
                var _a;
                if (e.target &&
                    e.target.className != null &&
                    e.target.className == 'defTextInput') {
                    var input = e.target;
                    input.parentNode.lastChild.style.opacity = '1';
                    (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemOnlyOne(input.parentNode);
                }
            };
            DrawingCanvas.prototype.OnTextChanged = function (e) {
                var _a, _b, _c;
                if (e.target &&
                    e.target.className != null &&
                    e.target.className == 'defTextInput') {
                    var input = e.target;
                    if (input.innerHTML == '') {
                        input.parentNode.parentNode.removeChild(input.parentNode);
                        (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.OnClickText(1);
                    }
                    else {
                        this.nowInput = true;
                        input.parentNode.lastChild.style.opacity = '0';
                        (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.OnClickText(1);
                        (_c = upred.ui.uiModule) === null || _c === void 0 ? void 0 : _c.SelectItemOnlyOne(input.parentNode);
                    }
                }
            };
            DrawingCanvas.prototype.OnMouseUp = function (e) {
                if (this.nowMovingText != null) {
                    this.nowMovingText.lastChild.style.opacity = '0';
                    this.nowMovingText = null;
                    return;
                }
                if (this.mode == 0)
                    return;
                this.nowDrawing = false;
                if (this.mode == 3 && e.target == this.textCanvas) {
                    this.MakeNewTextInput();
                }
            };
            DrawingCanvas.prototype.OnMouseMove = function (e) {
                var x, y;
                if (e.type == 'touchmove') {
                    x = e.targetTouches[0].pageX;
                    y = e.targetTouches[0].pageY;
                }
                else {
                    x = e.pageX;
                    y = e.pageY;
                }
                if (this.nowMovingText != null) {
                    var dx = x - this.oldX;
                    var dy = y - this.oldY;
                    this.nowMovingText.style.left = this.oldTX + dx + 'px';
                    this.nowMovingText.style.top = this.oldTY + dy + 'px';
                    this.nowMovingText.lastChild.style.opacity = '1';
                    return;
                }
                if (this.mode == 0)
                    return;
                if (!this.nowDrawing)
                    return;
                if (!this.gfx)
                    return;
                if (this.mode == 1) {
                    this.gfx.beginPath();
                    this.gfx.moveTo(this.oldX, this.oldY);
                    this.gfx.lineTo(x, y);
                    this.gfx.lineWidth = this.thickness;
                    this.gfx.strokeStyle = this.color;
                    this.gfx.stroke();
                    this.gfx.closePath();
                }
                else if (this.mode == 2) {
                    this.gfx.clearRect(x, y, 40, 40);
                }
                this.oldX = x;
                this.oldY = y;
            };
            return DrawingCanvas;
        }());
        ui.DrawingCanvas = DrawingCanvas;
    })(ui = upred.ui || (upred.ui = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var ui;
    (function (ui) {
        var CommonUI = (function () {
            function CommonUI() {
                this.selectorContext = {
                    oldX: 0,
                    oldY: 0,
                    started: false,
                };
                this.selectedItems = [];
                this.allItems = [];
                this.drawingCanvas = null;
                this.curSelectedButton = null;
                this.preSelectedButton = null;
                this.uiButtons = {};
                this.duplicated = [];
                this.disabledRotation = false;
                this.disabledDuplication = false;
                this.customMode = false;
                this.customModifierKey = [];
            }
            CommonUI.prototype.SelectItemOnlyOne = function (item) {
                this.UnselectAll();
                this.selectedItems.push(item);
                item.highlighter(item, true);
                this.ShowModifyButtons();
            };
            CommonUI.prototype.SelectItemAdd = function (item) {
                if (this.selectedItems.indexOf(item) < 0) {
                    this.selectedItems.push(item);
                    item.highlighter(item, true);
                    this.ShowModifyButtons();
                }
            };
            CommonUI.prototype.UnselectAll = function () {
                for (var i = 0; i < this.selectedItems.length; i++)
                    this.selectedItems[i].highlighter(this.selectedItems[i], false);
                this.selectedItems = [];
                this.HideModifyButtons();
            };
            CommonUI.prototype.HideModifyButtons = function () {
                if (this.customMode)
                    return;
                for (var i = 0; i < this.customModifierKey.length; i++) {
                    if (this.uiButtons[this.customModifierKey[i]].alwaysOn)
                        continue;
                    this.uiButtons[this.customModifierKey[i]].tag.className = 'uiButtonDefGrayed';
                }
                if (!this.disabledRotation) {
                    this.uiButtons.rotateLeft.tag.className = 'uiButtonDefGrayed';
                    this.uiButtons.rotateRight.tag.className = 'uiButtonDefGrayed';
                }
                if (!this.disabledDuplication)
                    this.uiButtons.duplicate.tag.className = 'uiButtonDefGrayed';
                this.uiButtons.delete.tag.className = 'uiButtonDefGrayed';
            };
            CommonUI.prototype.ShowModifyButtons = function () {
                if (this.customMode)
                    return;
                for (var i = this.customModifierKey.length - 1; i >= 0; i--) {
                    if (this.uiButtons[this.customModifierKey[i]].checkHandler) {
                        if (this.uiButtons[this.customModifierKey[i]].checkHandler()) {
                            this.uiButtons[this.customModifierKey[i]].tag.className = 'uiButtonDef';
                        }
                        else {
                            this.uiButtons[this.customModifierKey[i]].tag.className = 'uiButtonDefGrayed';
                        }
                    }
                    else {
                        this.uiButtons[this.customModifierKey[i]].tag.className = 'uiButtonDef';
                    }
                }
                if (!this.disabledRotation) {
                    this.uiButtons.rotateLeft.tag.className = 'uiButtonDef';
                    this.uiButtons.rotateRight.tag.className = 'uiButtonDef';
                }
                if (!this.disabledDuplication) {
                    if (!(upred.ui.mathModule.DuplicationChecker)
                        || (upred.ui.mathModule.DuplicationChecker && upred.ui.mathModule.DuplicationChecker())) {
                        this.uiButtons.duplicate.tag.className = 'uiButtonDef';
                    }
                    else {
                        this.uiButtons.duplicate.tag.className = 'uiButtonDefGrayed';
                    }
                }
                if (upred.ui.mathModule.DeleteChecker) {
                    if (upred.ui.mathModule.DeleteChecker()) {
                        this.uiButtons.delete.tag.className = 'uiButtonDef';
                    }
                    else {
                        this.uiButtons.delete.tag.className = 'uiButtonDefGrayed';
                    }
                }
                else {
                    this.uiButtons.delete.tag.className = 'uiButtonDef';
                }
            };
            CommonUI.prototype.MakeButton = function (binfo) {
                var bt = ui.HTML.newNode('button');
                bt.className = 'uiButtonDef';
                if (binfo.img) {
                    var img = new Image();
                    img.src = binfo.img;
                    bt.appendChild(img);
                }
                else if (binfo.bgColor) {
                    var clr = ui.HTML.newNode('div');
                    clr.className = 'uiButtonDefColor';
                    clr.style.background = binfo.bgColor;
                    bt.appendChild(clr);
                }
                var txt = ui.HTML.newNode('div');
                txt.className = 'uiButtonDefText';
                txt.innerHTML = binfo.txt;
                bt.appendChild(txt);
                if (binfo.handler)
                    bt.onclick = binfo.handler;
                if (binfo.downHandler)
                    bt.addEventListener('pointerdown', binfo.downHandler);
                return bt;
            };
            CommonUI.prototype.SelectButton = function (bt) {
                for (var key in this.uiButtons) {
                    if (this.uiButtons.hasOwnProperty(key)) {
                        if (this.uiButtons[key].tag.className != 'uiButtonDefGrayed')
                            this.uiButtons[key].tag.className = 'uiButtonDef';
                    }
                }
                if (bt != null)
                    bt.tag.className = 'uiButtonDefSelected';
                this.preSelectedButton = this.curSelectedButton;
                this.curSelectedButton = bt;
            };
            CommonUI.prototype.OnSelectorStart = function (e) {
                if (this.selectorContext.started)
                    return;
                if (e.target != this.selectorArea)
                    return;
                this.selectorContext.oldX = e.pageX;
                this.selectorContext.oldY = e.pageY;
                this.selectorArea.appendChild(this.selectorRect);
                this.selectorRect.style.left = e.pageX + 'px';
                this.selectorRect.style.top = e.pageY + 'px';
                this.selectorRect.style.width = '1px';
                this.selectorRect.style.height = '1px';
                this.selectorContext.started = true;
                e.preventDefault();
            };
            CommonUI.prototype.OnSelectorMove = function (e) {
                if (!this.selectorContext.started)
                    return;
                var dx = e.pageX - this.selectorContext.oldX;
                var dy = e.pageY - this.selectorContext.oldY;
                if (dx < 0) {
                    this.selectorRect.style.left = e.pageX + 'px';
                }
                else {
                    this.selectorRect.style.left = this.selectorContext.oldX + 'px';
                }
                if (dy < 0) {
                    this.selectorRect.style.top = e.pageY + 'px';
                }
                else {
                    this.selectorRect.style.top = this.selectorContext.oldY + 'px';
                }
                this.selectorRect.style.width = Math.abs(dx) + 'px';
                this.selectorRect.style.height = Math.abs(dy) + 'px';
                e.preventDefault();
            };
            CommonUI.prototype.OnSelectorEnd = function (e) {
                var _a, _b;
                if (!this.selectorContext.started)
                    return;
                if (this.selectorArea.contains(this.selectorRect)) {
                    this.selectorSize = this.selectorRect.getBoundingClientRect();
                    this.selectorArea.removeChild(this.selectorRect);
                    (_a = upred.ui.mathModule) === null || _a === void 0 ? void 0 : _a.SetSelectionBy(this.selectorSize.left, this.selectorSize.top, this.selectorSize.width, this.selectorSize.height);
                    (_b = this.drawingCanvas) === null || _b === void 0 ? void 0 : _b.SetSelectionBy(this.selectorSize.left, this.selectorSize.top, this.selectorSize.width, this.selectorSize.height);
                }
                this.selectorContext.started = false;
                e.preventDefault();
                this.SelectButton(null);
                this.HideSelectorArea();
            };
            CommonUI.prototype.AddCustomModifier = function (key, btinfo) {
                var btContainer = ui.HTML.id('UI_TOOLBAR');
                var bt = this.MakeButton(btinfo);
                this.uiButtons[key] = btinfo;
                this.uiButtons[key].tag = bt;
                btContainer.insertBefore(bt, btContainer.children[1]);
                this.customModifierKey.push(key);
            };
            CommonUI.prototype.AddCustomPresetButton = function (key, btinfo) {
                var btContainer = ui.HTML.id('UI_TOOLBAR');
                var bt = this.MakeButton(btinfo);
                this.uiButtons[key] = btinfo;
                this.uiButtons[key].tag = bt;
                btContainer.insertBefore(bt, btContainer.children[1]);
            };
            CommonUI.prototype.Init = function () {
                this.uiButtons = {
                    select: {
                        img: '../common/asset/bt_select.svg',
                        txt: '선택',
                        handler: this.OnClickSelect.bind(this),
                    },
                    rotateLeft: {
                        img: '../common/asset/bt_rotate_left.svg',
                        txt: '회전',
                        handler: this.OnClickRotateLeft.bind(this),
                    },
                    rotateRight: {
                        img: '../common/asset/bt_rotate_right.svg',
                        txt: '회전',
                        handler: this.OnClickRotateRight.bind(this),
                    },
                    duplicate: {
                        img: '../common/asset/bt_duplicate.svg',
                        txt: '복제',
                        handler: this.OnClickDuplicate.bind(this),
                    },
                    delete: {
                        img: '../common/asset/bt_delete.svg',
                        txt: '삭제',
                        handler: this.OnClickDelete.bind(this),
                    },
                    color: {
                        img: null,
                        bgColor: '#C0392B',
                        txt: '색상변경',
                        handler: this.OnClickColorTools.bind(this),
                    },
                    penThin: {
                        img: '../common/asset/bt_pen_thin.svg',
                        txt: '펜',
                        handler: this.OnClickThin.bind(this),
                    },
                    penThick: {
                        img: '../common/asset/bt_pen_thick.svg',
                        txt: '색연필',
                        handler: this.OnClickThick.bind(this),
                    },
                    text: {
                        img: '../common/asset/bt_text.svg',
                        txt: '글자입력',
                        handler: this.OnClickText.bind(this),
                    },
                    eraser: {
                        img: '../common/asset/bt_eraser.svg',
                        txt: '지우개',
                        handler: this.OnClickEraser.bind(this),
                    },
                    trash: {
                        img: '../common/asset/bt_trash.svg',
                        txt: '새로시작',
                        handler: this.OnClickRestart.bind(this),
                    },
                };
                this.selectorArea = ui.HTML.newNode('div');
                this.selectorArea.className = 'selectorArea';
                this.selectorRect = ui.HTML.newNode('div');
                this.selectorRect.className = 'selectorBox';
                this.selectorArea.addEventListener('pointerdown', this.OnSelectorStart.bind(this));
                window.addEventListener('pointermove', this.OnSelectorMove.bind(this));
                window.addEventListener('pointerup', this.OnSelectorEnd.bind(this));
                this.colorPalette = ui.HTML.newNode('div');
                this.colorPalette.className = 'uiColorPalette';
                for (var i = 0; i < upred.ui.penColors.length; i++) {
                    var bt = ui.HTML.newNode('button');
                    bt.className = 'uiColorButton';
                    bt.style.background = upred.ui.penColors[i];
                    bt.onclick = this.OnClickChangeColor.bind(this);
                    this.colorPalette.appendChild(bt);
                }
                this.colorPalette.style.position = 'absolute';
                this.colorPalette.style.display = 'none';
                this.colorPalette.style.zIndex = '50001';
                document.body.appendChild(this.colorPalette);
                this.drawingCanvas = new ui.DrawingCanvas();
                this.drawingCanvas.buttonTextInput = this.uiButtons.text;
                var btContainer = ui.HTML.id('UI_TOOLBAR');
                for (var key in this.uiButtons) {
                    if (this.uiButtons.hasOwnProperty(key)) {
                        var bt = this.MakeButton(this.uiButtons[key]);
                        this.uiButtons[key].tag = bt;
                        btContainer.appendChild(bt);
                    }
                }
            };
            CommonUI.prototype.RemoveMainButton = function (bt) {
                var btContainer = ui.HTML.id('UI_TOOLBAR');
                if (btContainer.contains(bt.tag))
                    btContainer.removeChild(bt.tag);
            };
            CommonUI.prototype.OnClickColorTools = function () {
                this.HideSelectorArea();
                if (this.curSelectedButton == this.uiButtons.color) {
                    this.colorPalette.style.display = 'none';
                    this.SelectButton(null);
                }
                else {
                    var xy = ui.HTML.getXY(this.uiButtons.color.tag);
                    this.colorPalette.style.bottom =
                        ui.ScreenUtil.GetScreenHeight() - xy.y + 10 + 'px';
                    this.colorPalette.style.left =
                        xy.x + Math.floor(xy.w / 2) + 'px';
                    this.colorPalette.style.display = 'block';
                    this.SelectButton(this.uiButtons.color);
                }
            };
            CommonUI.prototype.OnClickChangeColor = function (e) {
                var _a;
                this.HideSelectorArea();
                if (e.currentTarget == null)
                    return;
                this.uiButtons.color.tag.firstChild.style.background =
                    e.currentTarget.style.background;
                (_a = this.drawingCanvas) === null || _a === void 0 ? void 0 : _a.SetColor(e.currentTarget.style.background);
                if (upred.ui.mathModule) {
                    if (upred.ui.mathModule.ChangeColorHandler) {
                        upred.ui.mathModule.ChangeColorHandler(e.currentTarget.style.background);
                    }
                }
                for (var i = 0; i < this.selectedItems.length; i++) {
                    if (this.selectedItems[i].colorChanger) {
                        this.selectedItems[i].colorChanger(this.selectedItems[i], e.currentTarget.style.background);
                    }
                }
                this.colorPalette.style.display = 'none';
                switch (this.preSelectedButton) {
                    case this.uiButtons.penThin:
                        this.OnClickThin();
                        break;
                    case this.uiButtons.penThick:
                        this.OnClickThick();
                        break;
                    default:
                        this.SelectButton(null);
                        break;
                }
            };
            CommonUI.prototype.OnClickText = function (forceMode) {
                var _a, _b, _c, _d;
                this.HideSelectorArea();
                if (forceMode == 1 ||
                    this.curSelectedButton == this.uiButtons.text) {
                    this.SelectButton(null);
                    (_a = this.drawingCanvas) === null || _a === void 0 ? void 0 : _a.TextOff();
                    (_b = upred.ui.mathModule) === null || _b === void 0 ? void 0 : _b.EnableInteraction();
                }
                else {
                    this.SelectButton(this.uiButtons.text);
                    if (forceMode != 2)
                        (_c = this.drawingCanvas) === null || _c === void 0 ? void 0 : _c.TextOn();
                    (_d = upred.ui.mathModule) === null || _d === void 0 ? void 0 : _d.DisableInteraction();
                }
            };
            CommonUI.prototype.OnClickThin = function () {
                var _a, _b, _c, _d, _e, _f, _g;
                this.HideSelectorArea();
                if (this.curSelectedButton == this.uiButtons.penThin) {
                    this.SelectButton(null);
                    (_a = this.drawingCanvas) === null || _a === void 0 ? void 0 : _a.EraserOff();
                    (_b = this.drawingCanvas) === null || _b === void 0 ? void 0 : _b.PenOff();
                    (_c = upred.ui.mathModule) === null || _c === void 0 ? void 0 : _c.EnableInteraction();
                }
                else {
                    (_d = this.drawingCanvas) === null || _d === void 0 ? void 0 : _d.EraserOff();
                    (_e = this.drawingCanvas) === null || _e === void 0 ? void 0 : _e.PenOn();
                    (_f = upred.ui.mathModule) === null || _f === void 0 ? void 0 : _f.DisableInteraction();
                    (_g = this.drawingCanvas) === null || _g === void 0 ? void 0 : _g.SetThickness('2');
                    this.SelectButton(this.uiButtons.penThin);
                }
            };
            CommonUI.prototype.OnClickThick = function () {
                var _a, _b, _c, _d, _e, _f, _g;
                this.HideSelectorArea();
                if (this.curSelectedButton == this.uiButtons.penThick) {
                    this.SelectButton(null);
                    (_a = this.drawingCanvas) === null || _a === void 0 ? void 0 : _a.EraserOff();
                    (_b = this.drawingCanvas) === null || _b === void 0 ? void 0 : _b.PenOff();
                    (_c = upred.ui.mathModule) === null || _c === void 0 ? void 0 : _c.EnableInteraction();
                }
                else {
                    (_d = this.drawingCanvas) === null || _d === void 0 ? void 0 : _d.EraserOff();
                    (_e = this.drawingCanvas) === null || _e === void 0 ? void 0 : _e.PenOn();
                    (_f = upred.ui.mathModule) === null || _f === void 0 ? void 0 : _f.DisableInteraction();
                    (_g = this.drawingCanvas) === null || _g === void 0 ? void 0 : _g.SetThickness('8');
                    this.SelectButton(this.uiButtons.penThick);
                }
            };
            CommonUI.prototype.OnClickEraser = function () {
                var _a, _b, _c, _d, _e, _f;
                this.HideSelectorArea();
                if (this.curSelectedButton == this.uiButtons.eraser) {
                    this.SelectButton(null);
                    (_a = this.drawingCanvas) === null || _a === void 0 ? void 0 : _a.PenOff();
                    (_b = this.drawingCanvas) === null || _b === void 0 ? void 0 : _b.EraserOff();
                    (_c = upred.ui.mathModule) === null || _c === void 0 ? void 0 : _c.EnableInteraction();
                }
                else {
                    (_d = this.drawingCanvas) === null || _d === void 0 ? void 0 : _d.PenOff();
                    (_e = this.drawingCanvas) === null || _e === void 0 ? void 0 : _e.EraserOn();
                    (_f = upred.ui.mathModule) === null || _f === void 0 ? void 0 : _f.DisableInteraction();
                    this.SelectButton(this.uiButtons.eraser);
                }
            };
            CommonUI.prototype.OnClickRestart = function () {
                var _a, _b, _c, _d;
                this.HideSelectorArea();
                if (confirm('모든 입력 내용을 지우고 처음 상태로 되돌리시겠습니까?')) {
                    (_a = this.drawingCanvas) === null || _a === void 0 ? void 0 : _a.ClearAll();
                    (_b = this.drawingCanvas) === null || _b === void 0 ? void 0 : _b.TextOff();
                    (_c = this.drawingCanvas) === null || _c === void 0 ? void 0 : _c.PenOff();
                    this.SelectButton(null);
                    (_d = upred.ui.mathModule) === null || _d === void 0 ? void 0 : _d.RestoreInitialState();
                    this.HideModifyButtons();
                }
            };
            CommonUI.prototype.BackToInit = function () {
                var _a, _b;
                (_a = upred.ui.mathModule) === null || _a === void 0 ? void 0 : _a.RestoreInitialState();
                (_b = this.drawingCanvas) === null || _b === void 0 ? void 0 : _b.ClearAll();
                this.HideModifyButtons();
            };
            CommonUI.prototype.OnClickRotateLeft = function () {
                this.HideSelectorArea();
                for (var i = 0; i < this.selectedItems.length; i++) {
                    if (this.selectedItems[i].rotateHandler) {
                        this.selectedItems[i].rotateHandler(this.selectedItems[i], -90);
                    }
                }
            };
            CommonUI.prototype.OnClickRotateRight = function () {
                this.HideSelectorArea();
                for (var i = 0; i < this.selectedItems.length; i++) {
                    if (this.selectedItems[i].rotateHandler) {
                        this.selectedItems[i].rotateHandler(this.selectedItems[i], 90);
                    }
                }
            };
            CommonUI.prototype.OnClickDuplicate = function () {
                this.HideSelectorArea();
                this.duplicated = [];
                for (var i = 0; i < this.selectedItems.length; i++) {
                    if (this.selectedItems[i].duplicateHandler) {
                        this.selectedItems[i].duplicateHandler(this.selectedItems[i]);
                    }
                }
                this.UnselectAll();
                for (var i = 0; i < this.duplicated.length; i++) {
                    this.SelectItemAdd(this.duplicated[i]);
                }
                this.duplicated = [];
            };
            CommonUI.prototype.OnClickDelete = function () {
                this.HideSelectorArea();
                this.SelectButton(null);
                if (this.selectedItems.length > 0) {
                    if (confirm('선택한 ' +
                        this.selectedItems.length +
                        '개 요소를 삭제하시겠습니까?')) {
                        for (var i = 0; i < this.selectedItems.length; i++) {
                            if (this.selectedItems[i].deleteHandler) {
                                this.selectedItems[i].deleteHandler(this.selectedItems[i]);
                            }
                        }
                        this.HideModifyButtons();
                    }
                }
            };
            CommonUI.prototype.HideSelectorArea = function () {
                if (document.body.contains(this.selectorArea)) {
                    document.body.removeChild(this.selectorArea);
                }
            };
            CommonUI.prototype.OnClickSelect = function () {
                if (this.curSelectedButton == this.uiButtons.select) {
                    this.SelectButton(null);
                    this.HideSelectorArea();
                    this.UnselectAll();
                }
                else {
                    this.SelectButton(this.uiButtons.select);
                    document.body.appendChild(this.selectorArea);
                    this.UnselectAll();
                }
            };
            CommonUI.prototype.DisableRotation = function () {
                this.uiButtons.rotateLeft.tag.style.display = 'none';
                this.uiButtons.rotateRight.tag.style.display = 'none';
                this.disabledRotation = true;
            };
            CommonUI.prototype.DisableDuplication = function () {
                this.uiButtons.duplicate.tag.style.display = 'none';
                this.disabledDuplication = true;
            };
            CommonUI.prototype.Start = function (mathmodule) {
                upred.ui.uiModule = this;
                upred.ui.mathModule = mathmodule;
                this.Init();
                upred.ui.mathModule.Init();
                this.HideModifyButtons();
            };
            CommonUI.prototype.StartCustom = function (btSet, startupFunc) {
                upred.ui.uiModule = this;
                this.customMode = true;
                this.uiButtons = {
                    color: {
                        img: null,
                        bgColor: '#C0392B',
                        txt: '색상변경',
                        handler: this.OnClickColorTools.bind(this),
                    },
                    penThin: {
                        img: '../common/asset/bt_pen_thin.svg',
                        txt: '펜',
                        handler: this.OnClickThin.bind(this),
                    },
                    penThick: {
                        img: '../common/asset/bt_pen_thick.svg',
                        txt: '색연필',
                        handler: this.OnClickThick.bind(this),
                    },
                    text: {
                        img: '../common/asset/bt_text.svg',
                        txt: '글자입력',
                        handler: this.OnClickText.bind(this),
                    },
                    eraser: {
                        img: '../common/asset/bt_eraser.svg',
                        txt: '지우개',
                        handler: this.OnClickEraser.bind(this),
                    },
                    trash: {
                        img: '../common/asset/bt_trash.svg',
                        txt: '새로시작',
                        handler: function () { location.reload(); }
                    },
                };
                this.selectorArea = ui.HTML.newNode('div');
                this.selectorArea.className = 'selectorArea';
                this.selectorRect = ui.HTML.newNode('div');
                this.selectorRect.className = 'selectorBox';
                this.selectorArea.addEventListener('pointerdown', this.OnSelectorStart.bind(this));
                window.addEventListener('pointermove', this.OnSelectorMove.bind(this));
                window.addEventListener('pointerup', this.OnSelectorEnd.bind(this));
                this.colorPalette = ui.HTML.newNode('div');
                this.colorPalette.className = 'uiColorPalette';
                for (var i = 0; i < upred.ui.penColors.length; i++) {
                    var bt = ui.HTML.newNode('button');
                    bt.className = 'uiColorButton';
                    bt.style.background = upred.ui.penColors[i];
                    bt.onclick = this.OnClickChangeColor.bind(this);
                    this.colorPalette.appendChild(bt);
                }
                this.colorPalette.style.position = 'absolute';
                this.colorPalette.style.display = 'none';
                this.colorPalette.style.zIndex = '50001';
                document.body.appendChild(this.colorPalette);
                this.drawingCanvas = new ui.DrawingCanvas();
                this.drawingCanvas.buttonTextInput = this.uiButtons.text;
                var btContainer = ui.HTML.id('UI_TOOLBAR');
                for (var key in this.uiButtons) {
                    if (this.uiButtons.hasOwnProperty(key)) {
                        var bt = this.MakeButton(this.uiButtons[key]);
                        this.uiButtons[key].tag = bt;
                        btContainer.appendChild(bt);
                    }
                }
                for (var key in btSet) {
                    if (btSet.hasOwnProperty(key)) {
                        var bt = this.MakeButton(btSet[key]);
                        this.uiButtons[key] = btSet[key];
                        this.uiButtons[key].tag = bt;
                        btContainer.insertBefore(bt, btContainer.firstChild);
                    }
                }
                if (startupFunc)
                    startupFunc();
            };
            return CommonUI;
        }());
        ui.CommonUI = CommonUI;
    })(ui = upred.ui || (upred.ui = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var ui;
    (function (ui) {
        ui.mathModule = null;
        ui.uiModule = null;
    })(ui = upred.ui || (upred.ui = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var ui;
    (function (ui) {
        var SVGSymbol = (function () {
            function SVGSymbol(symmbolid) {
                this.subTag = [];
                this.defsTag = null;
                if (SVGSymbol.FILL_NO == 0)
                    SVGSymbol.FILL_NO = 1;
                if (!SVGSymbol.masterContainer) {
                    SVGSymbol.masterContainer = ui.HTML.newDivStyled({
                        position: 'absolute',
                        pointerEvents: 'none',
                    });
                    if (document.getElementById('WORKAREA').firstChild)
                        document
                            .getElementById('WORKAREA')
                            .insertBefore(SVGSymbol.masterContainer, document.getElementById('WORKAREA').firstChild);
                    else
                        document
                            .getElementById('WORKAREA')
                            .appendChild(SVGSymbol.masterContainer);
                }
                this.rootTag = document.createElementNS(SVGSymbol.svgNS, 'svg');
                this.symbolTag = document.createElementNS(SVGSymbol.svgNS, 'symbol');
                this.symbolId = symmbolid;
                this.symbolTag.setAttribute('style', 'display:inline-block;');
                this.symbolTag.setAttribute('id', symmbolid);
                this.rootTag.appendChild(this.symbolTag);
                this.subTag = [];
                this.defsTag = null;
                SVGSymbol.masterContainer.appendChild(this.rootTag);
            }
            SVGSymbol.prototype.GetId = function () {
                return this.symbolId;
            };
            SVGSymbol.prototype.SetSize = function (w, h) {
                this.rootTag.setAttribute('width', w);
                this.rootTag.setAttribute('height', h);
                return this;
            };
            SVGSymbol.MakeTextTag = function (x, y, txt, color, stroke, strokeW, font, anchor, baseline, conatainerW, fitopt) {
                var ttag = document.createElementNS(SVGSymbol.svgNS, 'text');
                ttag.setAttribute('x', x.toString());
                ttag.setAttribute('y', y.toString());
                ttag.textContent = txt;
                ttag.style.dominantBaseline = baseline ? baseline : "hanging";
                ttag.style.font = font;
                ttag.style.fill = color;
                ttag.style.stroke = stroke;
                ttag.style.strokeWidth = strokeW;
                ttag.style.textAnchor = anchor;
                ttag.style.pointerEvents = 'none';
                ttag.style.touchAction = 'none';
                ttag.style.userSelect = 'none';
                if (conatainerW) {
                    ttag.setAttribute('textLength', conatainerW.toString());
                    if (fitopt)
                        ttag.setAttribute('lengthAdjust', fitopt);
                    else
                        ttag.setAttribute('lengthAdjust', 'spacingAndGlyphs');
                }
                return ttag;
            };
            SVGSymbol.prototype.AddText = function (x, y, txt, color, stroke, strokeW, font, anchor, baseline, conatainerW, fitopt) {
                var ttag = document.createElementNS(SVGSymbol.svgNS, 'text');
                ttag.setAttribute('x', x.toString());
                ttag.setAttribute('y', y.toString());
                ttag.textContent = txt;
                ttag.style.dominantBaseline = baseline ? baseline : "hanging";
                ttag.style.font = font;
                ttag.style.fill = color;
                ttag.style.stroke = stroke;
                ttag.style.strokeWidth = strokeW;
                ttag.style.textAnchor = anchor;
                ttag.style.pointerEvents = 'none';
                ttag.style.touchAction = 'none';
                ttag.style.userSelect = 'none';
                if (conatainerW) {
                    ttag.setAttribute('textLength', conatainerW.toString());
                    if (fitopt)
                        ttag.setAttribute('lengthAdjust', fitopt);
                    else
                        ttag.setAttribute('lengthAdjust', 'spacingAndGlyphs');
                }
                this.symbolTag.appendChild(ttag);
                this.subTag.push(ttag);
                return this;
            };
            SVGSymbol.prototype.AddLine = function (x1, y1, x2, y2, thickness, lineCap, lineJoin, lineColor) {
                var line = document.createElementNS(SVGSymbol.svgNS, 'line');
                line.setAttribute('x1', x1.toString());
                line.setAttribute('y1', y1.toString());
                line.setAttribute('x2', x2.toString());
                line.setAttribute('y2', y2.toString());
                line.style.strokeWidth = thickness.toString();
                line.style.strokeLinecap = lineCap;
                line.style.strokeLinejoin = lineJoin;
                if (lineColor)
                    line.style.stroke = lineColor;
                this.symbolTag.appendChild(line);
                this.subTag.push(line);
                return line;
            };
            SVGSymbol.prototype.AddPath = function (points, fill, lineColor, thickness, lineCap, lineJoin) {
                var path = document.createElementNS(SVGSymbol.svgNS, 'path');
                path.setAttribute('d', points);
                path.setAttribute('fill', fill);
                path.setAttribute('stroke', lineColor);
                path.setAttribute('stroke-width', thickness);
                path.setAttribute('stroke-linecap', lineCap);
                path.setAttribute('stroke-linejoin', lineJoin);
                this.symbolTag.appendChild(path);
                this.subTag.push(path);
                return path;
            };
            SVGSymbol.prototype.AddPolygon = function (points, bgColor, lineColor, lineThick) {
                var polygon = document.createElementNS(SVGSymbol.svgNS, 'polygon');
                var pstr = '';
                for (var i = 0; i < points.length; i += 2) {
                    if (i > 0)
                        pstr += ' ';
                    pstr += points[i];
                    pstr += ',';
                    pstr += points[i + 1];
                }
                polygon.setAttribute('points', pstr);
                polygon.setAttribute('stroke-linejoin', 'round');
                if (bgColor && lineColor && lineThick) {
                    var styletext = '';
                    if (bgColor != '')
                        styletext += 'fill:' + bgColor + ';';
                    if (lineThick > 0) {
                        styletext +=
                            'stroke:' + lineColor + ';stroke-width:' + lineThick;
                    }
                    polygon.setAttribute('style', styletext);
                }
                this.symbolTag.appendChild(polygon);
                this.subTag.push(polygon);
                return this;
            };
            SVGSymbol.prototype.AddCircle = function (cx, cy, radius, bgColor, lineColor, lineThick) {
                var circle = document.createElementNS(SVGSymbol.svgNS, 'circle');
                circle.setAttribute('cx', cx.toString());
                circle.setAttribute('cy', cy.toString());
                circle.setAttribute('r', radius.toString());
                var styletext = '';
                if (bgColor != '')
                    styletext += 'fill:' + bgColor + ';';
                if (lineColor && lineThick) {
                    if (lineThick > 0) {
                        styletext +=
                            'stroke:' + lineColor + ';stroke-width:' + lineThick;
                    }
                }
                if (styletext.length > 0) {
                    circle.setAttribute('style', styletext);
                }
                this.symbolTag.appendChild(circle);
                this.subTag.push(circle);
                return this;
            };
            SVGSymbol.prototype.AddRectangle = function (x, y, w, h, bgColor, lineColor, lineThick) {
                var rect = document.createElementNS(SVGSymbol.svgNS, 'rect');
                rect.setAttribute('x', x.toString());
                rect.setAttribute('y', y.toString());
                rect.setAttribute('width', w.toString());
                rect.setAttribute('height', h.toString());
                rect.setAttribute('stroke-linejoin', 'round');
                var styletext = '';
                if (bgColor != '')
                    styletext += 'fill:' + bgColor + ';';
                if (lineColor && lineThick) {
                    if (lineThick > 0) {
                        styletext +=
                            'stroke:' + lineColor + ';stroke-width:' + lineThick;
                    }
                }
                if (styletext.length > 0) {
                    rect.setAttribute('style', styletext);
                }
                this.symbolTag.appendChild(rect);
                this.subTag.push(rect);
                return this;
            };
            SVGSymbol.prototype.AddLinearGradient = function (x1, y1, x2, y2, offsetColorAlpha) {
                if (!this.defsTag) {
                    this.defsTag = document.createElementNS(SVGSymbol.svgNS, 'defs');
                    if (this.rootTag.firstChild)
                        this.rootTag.insertBefore(this.defsTag, this.rootTag.firstChild);
                    else
                        this.rootTag.appendChild(this.defsTag);
                }
                var linear = document.createElementNS(SVGSymbol.svgNS, 'linearGradient');
                SVGSymbol.FILL_NO++;
                var ids = 'linearFill' + SVGSymbol.FILL_NO;
                linear.setAttribute('id', ids);
                linear.setAttribute('x1', x1);
                linear.setAttribute('y1', y1);
                linear.setAttribute('x2', x2);
                linear.setAttribute('y2', y2);
                for (var i = 0; i < offsetColorAlpha.length; i += 3) {
                    var stop_1 = document.createElementNS(SVGSymbol.svgNS, 'stop');
                    stop_1.setAttribute('offset', offsetColorAlpha[i]);
                    stop_1.setAttribute('style', 'stop-color:' +
                        offsetColorAlpha[i + 1] +
                        ';stop-opacity:' +
                        offsetColorAlpha[i + 2]);
                    linear.appendChild(stop_1);
                }
                this.defsTag.appendChild(linear);
                return ids;
            };
            SVGSymbol.prototype.AddMarker = function (ids, markerWidth, markerHeight, refX, refY, viewBox, orient) {
                if (!this.defsTag) {
                    this.defsTag = document.createElementNS(SVGSymbol.svgNS, 'defs');
                    if (this.rootTag.firstChild)
                        this.rootTag.insertBefore(this.defsTag, this.rootTag.firstChild);
                    else
                        this.rootTag.appendChild(this.defsTag);
                }
                var marker = document.createElementNS(SVGSymbol.svgNS, 'marker');
                marker.setAttribute('id', ids);
                marker.setAttribute('markerWidth', markerWidth);
                marker.setAttribute('markerHeight', markerHeight);
                marker.setAttribute('refX', refX);
                marker.setAttribute('refY', refY);
                marker.setAttribute('viewBox', viewBox);
                marker.setAttribute('orient', orient);
                this.defsTag.appendChild(marker);
                return marker;
            };
            SVGSymbol.svgNS = 'http://www.w3.org/2000/svg';
            SVGSymbol.FILL_NO = 0;
            return SVGSymbol;
        }());
        ui.SVGSymbol = SVGSymbol;
    })(ui = upred.ui || (upred.ui = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var ui;
    (function (ui) {
        var SVGUnit = (function () {
            function SVGUnit(root) {
                this.subTag = [];
                this.defsTag = null;
                if (!SVGUnit.FILL_NO)
                    SVGUnit.FILL_NO = 1;
                if (root)
                    this.rootTag = root;
                else
                    this.rootTag = document.createElementNS(SVGUnit.svgNS, 'svg');
                this.subTag = [];
                this.defsTag = null;
            }
            SVGUnit.MakeTag = function (tagname) {
                return document.createElementNS(SVGUnit.svgNS, tagname);
            };
            SVGUnit.prototype.GetTag = function () {
                return this.rootTag;
            };
            SVGUnit.prototype.SetSize = function (w, h) {
                this.rootTag.setAttribute('width', w);
                this.rootTag.setAttribute('height', h);
                return this;
            };
            SVGUnit.prototype.GetWidth = function () {
                return this.rootTag.getAttribute('width');
            };
            SVGUnit.prototype.GetHeight = function () {
                return this.rootTag.getAttribute('height');
            };
            SVGUnit.prototype.SetViewBox = function (x, y, w, h) {
                this.rootTag.setAttribute('viewBox', x.toString() + " " + y.toString() + " " + w.toString() + " " + h.toString());
                return this;
            };
            SVGUnit.prototype.AddText = function (x, y, txt) {
                var ttag = document.createElementNS(SVGUnit.svgNS, 'text');
                ttag.setAttribute('x', x.toString());
                ttag.setAttribute('y', y.toString());
                ttag.textContent = txt;
                ttag.style.dominantBaseline = "hanging";
                this.rootTag.appendChild(ttag);
                this.subTag.push(ttag);
                return this;
            };
            SVGUnit.prototype.AddSymbol = function (ids) {
                var usetag = document.createElementNS(SVGUnit.svgNS, 'use');
                usetag.setAttribute('href', '#' + ids);
                this.rootTag.appendChild(usetag);
                var w = ui.HTML.id(ids).parentNode.getAttribute('width');
                var h = ui.HTML.id(ids).parentNode.getAttribute('height');
                this.subTag.push(usetag);
                this.SetSize(w, h);
                return this;
            };
            SVGUnit.AddSymbolTo = function (parentnode, ids) {
                var usetag = document.createElementNS(SVGUnit.svgNS, 'use');
                usetag.setAttribute('href', '#' + ids);
                parentnode.appendChild(usetag);
            };
            SVGUnit.prototype.AddPolygon = function (points, bgColor, lineColor, lineThick) {
                var polygon = document.createElementNS(SVGUnit.svgNS, 'polygon');
                var pstr = '';
                for (var i = 0; i < points.length; i += 2) {
                    if (i > 0)
                        pstr += ' ';
                    pstr += points[i];
                    pstr += ',';
                    pstr += points[i + 1];
                }
                polygon.setAttribute('points', pstr);
                var styletext = '';
                if (bgColor != '')
                    styletext += 'fill:' + bgColor + ';';
                if (lineThick > 0) {
                    styletext +=
                        'stroke:' + lineColor + ';stroke-width:' + lineThick;
                }
                polygon.setAttribute('style', styletext);
                this.rootTag.appendChild(polygon);
                this.subTag.push(polygon);
                return this;
            };
            SVGUnit.prototype.AddCircle = function (cx, cy, radius, bgColor, lineColor, lineThick) {
                var circle = document.createElementNS(SVGUnit.svgNS, 'circle');
                circle.setAttribute('cx', cx);
                circle.setAttribute('cy', cy);
                circle.setAttribute('r', radius);
                var styletext = '';
                if (bgColor != '')
                    styletext += 'fill:' + bgColor + ';';
                if (lineThick > 0) {
                    styletext +=
                        'stroke:' + lineColor + ';stroke-width:' + lineThick;
                }
                circle.setAttribute('style', styletext);
                this.rootTag.appendChild(circle);
                this.subTag.push(circle);
                return this;
            };
            SVGUnit.prototype.AddRectangle = function (x, y, w, h, bgColor, lineColor, lineThick) {
                var rect = document.createElementNS(SVGUnit.svgNS, 'rect');
                rect.setAttribute('x', x);
                rect.setAttribute('y', y);
                rect.setAttribute('width', w);
                rect.setAttribute('height', h);
                var styletext = '';
                if (bgColor)
                    styletext += 'fill:' + bgColor + '; ';
                if (lineColor)
                    styletext += 'stroke:' + lineColor + '; ';
                if (lineThick)
                    styletext += 'stroke-width:' + lineThick;
                if (styletext.length > 0)
                    rect.setAttribute('style', styletext);
                this.rootTag.appendChild(rect);
                this.subTag.push(rect);
                return this;
            };
            SVGUnit.prototype.AddLinearGradient = function (x1, y1, x2, y2, offsetColorAlpha) {
                if (!this.defsTag) {
                    this.defsTag = document.createElementNS(SVGUnit.svgNS, 'defs');
                    if (this.rootTag.firstChild)
                        this.rootTag.insertBefore(this.defsTag, this.rootTag.firstChild);
                    else
                        this.rootTag.appendChild(this.defsTag);
                }
                var linear = document.createElementNS(SVGUnit.svgNS, 'linearGradient');
                SVGUnit.FILL_NO++;
                var ids = 'linearFillU' + SVGUnit.FILL_NO;
                linear.setAttribute('id', ids);
                linear.setAttribute('x1', x1);
                linear.setAttribute('y1', y1);
                linear.setAttribute('x2', x2);
                linear.setAttribute('y2', y2);
                for (var i = 0; i < offsetColorAlpha.length; i += 3) {
                    var stop_2 = document.createElementNS(SVGUnit.svgNS, 'stop');
                    stop_2.setAttribute('offset', offsetColorAlpha[i]);
                    stop_2.setAttribute('style', 'stop-color:' +
                        offsetColorAlpha[i + 1] +
                        ';stop-opacity:' +
                        offsetColorAlpha[i + 2]);
                    linear.appendChild(stop_2);
                }
                this.defsTag.appendChild(linear);
                return ids;
            };
            SVGUnit.svgNS = 'http://www.w3.org/2000/svg';
            SVGUnit.FILL_NO = 0;
            return SVGUnit;
        }());
        ui.SVGUnit = SVGUnit;
    })(ui = upred.ui || (upred.ui = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var ui;
    (function (ui) {
        var SVGCanvas = (function () {
            function SVGCanvas() {
                this.groupTag = [];
                this.posValue = [];
                this.dragStarter = {};
                this.sortDelta = 0;
                this.rootTag = document.createElementNS(SVGCanvas.svgNS, 'svg');
                document.getElementById('WORKAREA').appendChild(this.rootTag);
                this.FitToScreen();
                this.rootTag.addEventListener('pointerdown', this.OnDragStartCall.bind(this));
                window.addEventListener('resize', this.FitToScreen.bind(this));
            }
            SVGCanvas.prototype.ComparePosition = function (a, b) {
                if (a.x - this.sortDelta < b.x && a.x + this.sortDelta >= b.x) {
                    if (a.y <= b.y) {
                        return 1;
                    }
                    else
                        return -1;
                }
                return 0;
            };
            SVGCanvas.prototype.SortGroups = function (comparer) {
                var vl = [];
                for (var i = 0; i < this.posValue.length; i++) {
                    vl.push({ x: this.posValue[i].x, y: this.posValue[i].y, r: this.posValue[i].r, t: this.groupTag[i] });
                }
                if (comparer)
                    vl.sort(this.ComparePosition.bind(this));
                else
                    vl.sort(this.ComparePosition.bind(this));
                this.posValue = [];
                for (var i = 0; i < this.groupTag.length; i++) {
                    this.rootTag.removeChild(this.groupTag[i]);
                }
                this.groupTag = [];
                for (var i = 0; i < vl.length; i++) {
                    this.rootTag.appendChild(vl[i].t);
                    this.posValue.push({ x: vl[i].x, y: vl[i].y, r: vl[i].r });
                    this.groupTag.push(vl[i].t);
                }
            };
            SVGCanvas.prototype.OnDragStartCall = function (e) {
                var _a;
                if (!e.target)
                    return;
                var tagname = e.target.tagName;
                if (this.dragStarter.hasOwnProperty(tagname)) {
                    if (this.dragStarter[tagname](e)) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
                else {
                    (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                    if (upred.ui.mathModule && upred.ui.mathModule.ResetWorkMode)
                        upred.ui.mathModule.ResetWorkMode();
                }
            };
            SVGCanvas.prototype.MoveToFront = function () {
                document.getElementById('WORKAREA').appendChild(this.rootTag);
            };
            SVGCanvas.prototype.FitToScreen = function () {
                this.rootTag.setAttribute('style', 'position:absolute; left:0px; top:0px; touch-action: none;');
                this.rootTag.setAttribute('width', ui.ScreenUtil.GetScreenWidth());
                this.rootTag.setAttribute('height', ui.ScreenUtil.GetScreenHeight());
            };
            SVGCanvas.prototype.GetTag = function () {
                return this.rootTag;
            };
            SVGCanvas.prototype.AddGroup = function () {
                var gtag = document.createElementNS(SVGCanvas.svgNS, 'g');
                gtag.setAttribute('style', 'touch-action: none;');
                this.rootTag.appendChild(gtag);
                this.groupTag.push(gtag);
                this.posValue.push({ x: 0, y: 0, r: 0 });
                return gtag;
            };
            SVGCanvas.prototype.AddGroupExists = function (gtag, xpos, ypos) {
                this.rootTag.appendChild(gtag);
                this.groupTag.push(gtag);
                this.posValue.push({ x: xpos, y: ypos, r: 0 });
            };
            SVGCanvas.prototype.RestoreGroup = function (gtag, x, y, r) {
                var idx = this.groupTag.indexOf(gtag);
                if (idx < 0)
                    return;
                this.rootTag.appendChild(gtag);
                this.posValue[idx].x = x;
                this.posValue[idx].y = y;
                this.posValue[idx].r = r;
                gtag.setAttribute('transform', 'translate(' +
                    this.posValue[idx].x +
                    ',' +
                    this.posValue[idx].y +
                    ') rotate(' +
                    this.posValue[idx].r +
                    ')');
            };
            SVGCanvas.prototype.RemoveGroup = function (gtag) {
                if (this.groupTag.indexOf(gtag) >= 0) {
                    if (this.rootTag.contains(gtag))
                        this.rootTag.removeChild(gtag);
                    var idx = this.groupTag.indexOf(gtag);
                    this.groupTag.splice(idx, 1);
                    this.posValue.splice(idx, 1);
                }
            };
            SVGCanvas.prototype.GetGroupPositionValue = function (gtag) {
                var idx = this.groupTag.indexOf(gtag);
                if (idx < 0)
                    return null;
                return this.posValue[idx];
            };
            SVGCanvas.prototype.SetGroupPositionValue = function (gtag, xp, yp) {
                if (isNaN(xp) || isNaN(yp))
                    return;
                var idx = this.groupTag.indexOf(gtag);
                if (idx < 0)
                    return;
                this.posValue[idx] = { x: xp, y: yp, r: this.posValue[idx].r };
                gtag.setAttribute('transform', 'translate(' +
                    xp +
                    ',' +
                    yp +
                    ') rotate(' +
                    this.posValue[idx].r +
                    ')');
            };
            SVGCanvas.prototype.SetGroupRotationValue = function (gtag, ro) {
                if (isNaN(ro))
                    return;
                var idx = this.groupTag.indexOf(gtag);
                if (idx < 0)
                    return;
                ro %= 360;
                var roDelta = ro - this.posValue[idx].r;
                this.posValue[idx] = {
                    x: this.posValue[idx].x,
                    y: this.posValue[idx].y,
                    r: ro,
                };
                var firstBox = gtag.firstChild;
                var lastBox = gtag.firstChild;
                if (!firstBox) {
                    firstBox = gtag;
                    lastBox = gtag;
                }
                else {
                    for (var i = 0; i < gtag.children.length; i++) {
                        var fo = gtag.children[i].getAttribute('fill-opacity');
                        if (fo == '0')
                            break;
                        var href = gtag.children[i].getAttribute('href');
                        if (href == '#splitArrow')
                            break;
                        lastBox = gtag.children[i];
                    }
                }
                var firstSize = firstBox.getBoundingClientRect();
                var lastSize = lastBox.getBoundingClientRect();
                var cx = (firstSize.right - lastSize.left) / 2 + lastSize.left;
                var cy = (firstSize.bottom - lastSize.top) / 2 + lastSize.top;
                var x = this.posValue[idx].x;
                var y = this.posValue[idx].y;
                var theta = roDelta * (Math.PI / 180);
                var rotatedX = (x - cx) * Math.cos(theta) - (y - cy) * Math.sin(theta) + cx;
                var rotatedY = (x - cx) * Math.sin(theta) + (y - cy) * Math.cos(theta) + cy;
                this.posValue[idx].x = rotatedX;
                this.posValue[idx].y = rotatedY;
                gtag.setAttribute('transform', 'translate(' +
                    this.posValue[idx].x +
                    ',' +
                    this.posValue[idx].y +
                    ') rotate(' +
                    ro +
                    ')');
            };
            SVGCanvas.prototype.SetGroupRotationWithPivot = function (gtag, ro, px, py) {
                if (isNaN(ro))
                    return;
                var idx = this.groupTag.indexOf(gtag);
                if (idx < 0)
                    return;
                ro %= 360;
                var roDelta = ro - this.posValue[idx].r;
                this.posValue[idx] = {
                    x: this.posValue[idx].x,
                    y: this.posValue[idx].y,
                    r: ro,
                };
                var x = this.posValue[idx].x;
                var y = this.posValue[idx].y;
                var theta = roDelta * (Math.PI / 180);
                var rotatedX = (x - px) * Math.cos(theta) - (y - py) * Math.sin(theta) + px;
                var rotatedY = (x - px) * Math.sin(theta) + (y - py) * Math.cos(theta) + py;
                this.posValue[idx].x = rotatedX;
                this.posValue[idx].y = rotatedY;
                gtag.setAttribute('transform', 'translate(' +
                    this.posValue[idx].x +
                    ',' +
                    this.posValue[idx].y +
                    ') rotate(' +
                    ro +
                    ')');
            };
            SVGCanvas.prototype.SetGroupFront = function (gtag) {
                if (this.groupTag.indexOf(gtag) >= 0) {
                    var idx = this.groupTag.indexOf(gtag);
                    this.groupTag.splice(idx, 1);
                    this.groupTag.push(gtag);
                    var p = this.posValue.splice(idx, 1);
                    this.posValue.push(p[0]);
                    this.rootTag.removeChild(gtag);
                    this.rootTag.appendChild(gtag);
                }
            };
            SVGCanvas.svgNS = 'http://www.w3.org/2000/svg';
            return SVGCanvas;
        }());
        ui.SVGCanvas = SVGCanvas;
    })(ui = upred.ui || (upred.ui = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var ui;
    (function (ui) {
        var GuideViewer = (function () {
            function GuideViewer(imgUrl) {
                this.showButton = ui.HTML.newNode('button');
                this.showButton.id = 'UI_GUIDE_SHOW_BUTTON';
                this.fullscreenContainer = ui.HTML.newNode('button');
                this.fullscreenContainer.id = 'UI_GUIDE_FULL_SCREEN';
                this.fullscreenContainer.style.background = 'url("' + imgUrl + '")';
                this.fullscreenContainer.style.backgroundSize = '100% 100%';
                document.body.appendChild(this.fullscreenContainer);
                this.fullscreenContainer.onclick = this.OnClickImage.bind(this);
                this.showButton.onclick = this.OnClickShowImage.bind(this);
            }
            GuideViewer.prototype.OnClickImage = function (e) {
                if (document.body.contains(this.fullscreenContainer)) {
                    this.fullscreenContainer.style.animation = 'fadeOut 0.45s both';
                    var self_1 = this;
                    window.setTimeout(function () {
                        if (document.body.contains(self_1.fullscreenContainer))
                            document.body.removeChild(self_1.fullscreenContainer);
                    }, 500);
                }
                document.body.appendChild(this.showButton);
            };
            GuideViewer.prototype.OnClickShowImage = function (e) {
                this.fullscreenContainer.style.animation = 'fadeIn 0.45s both';
                document.body.appendChild(this.fullscreenContainer);
            };
            GuideViewer.Show = function (imgurl) {
                var gv = new GuideViewer(imgurl);
            };
            return GuideViewer;
        }());
        ui.GuideViewer = GuideViewer;
    })(ui = upred.ui || (upred.ui = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var math;
    (function (math) {
        var GroupType;
        (function (GroupType) {
            GroupType[GroupType["NONE"] = 0] = "NONE";
            GroupType[GroupType["FRONT"] = 1] = "FRONT";
            GroupType[GroupType["BACK"] = 2] = "BACK";
        })(GroupType || (GroupType = {}));
        var DragMode;
        (function (DragMode) {
            DragMode[DragMode["NONE"] = 0] = "NONE";
            DragMode[DragMode["MOVE"] = 1] = "MOVE";
            DragMode[DragMode["NEW"] = 2] = "NEW";
        })(DragMode || (DragMode = {}));
        var NCGroup = (function () {
            function NCGroup(canvas) {
                this.groupTag = canvas.AddGroup();
                this.groupType = GroupType.NONE;
                upred.ui.HTML.setStyle(this.groupTag, {
                    position: 'absolute',
                });
            }
            NCGroup.prototype.Flip = function (wSize) {
                this.groupTag.children[1].style.transformOrigin = (wSize / 2).toString() + 'px 0px';
                this.groupTag.firstChild.style.transformOrigin = (wSize / 2).toString() + 'px 0px';
                this.groupTag.children[1].style.animation = 'flipOutRight 0.5s both';
                this.groupTag.firstChild.style.animation = 'flipInLeft 0.5s both';
                this.groupTag.insertBefore(this.groupTag.children[1], this.groupTag.firstChild);
                var self = this;
                window.setTimeout(function () {
                    self.groupTag.children[1].style.animation = '';
                    self.groupTag.firstChild.style.animation = '';
                }, 500);
            };
            NCGroup.prototype.SetColor = function (r, g, b) {
                var styletext = 'fill:' +
                    this.MakeRGB(r, g, b, 1) +
                    '; stroke:' +
                    this.MakeRGB(r, g, b, 0.5) +
                    '; stroke-width:2;';
                for (var i = 0; i < this.groupTag.children.length; i++) {
                    this.groupTag.children[i].setAttribute('style', styletext);
                }
            };
            NCGroup.prototype.MakeRGB = function (r, g, b, m) {
                r *= m;
                if (r < 0)
                    r = 0;
                if (r > 255)
                    r = 255;
                g *= m;
                if (g < 0)
                    g = 0;
                if (g > 255)
                    g = 255;
                b *= m;
                if (b < 0)
                    b = 0;
                if (b > 255)
                    b = 255;
                r = Math.floor(r);
                g = Math.floor(g);
                b = Math.floor(b);
                return 'rgb(' + r + ',' + g + ',' + b + ')';
            };
            return NCGroup;
        }());
        var NumberCards = (function () {
            function NumberCards() {
                this.WSize = 160;
                this.HSize = 240;
                this.dragMode = DragMode.NONE;
                this.xyBefore = { x: 0, y: 0 };
                this.xyNow = { x: 0, y: 0 };
                this.xyOrg = { x: 0, y: 0, r: 0 };
                this.ncGroups = [];
                this.presetColors = [
                    93, 173, 226,
                    93, 173, 226,
                    93, 173, 226,
                    93, 173, 226
                ];
            }
            NumberCards.prototype.MakeRGB = function (r, g, b, m) {
                r *= m;
                if (r < 0)
                    r = 0;
                if (r > 255)
                    r = 255;
                g *= m;
                if (g < 0)
                    g = 0;
                if (g > 255)
                    g = 255;
                b *= m;
                if (b < 0)
                    b = 0;
                if (b > 255)
                    b = 255;
                r = Math.floor(r);
                g = Math.floor(g);
                b = Math.floor(b);
                return 'rgb(' + r + ',' + g + ',' + b + ')';
            };
            NumberCards.prototype.MakeCard = function (ids, n) {
                var symbol = new upred.ui.SVGSymbol(ids);
                symbol.AddRectangle(2, 2, this.WSize, this.HSize, '#F4F3E3', '#787761', 1);
                symbol.AddText(this.WSize / 2, this.HSize / 2 * 0.9, n.toString(), 'white', 'black', '3px', 'bold ' + this.HSize + 'px sans-serif', 'middle', 'central', this.WSize * 0.8);
                symbol.SetSize((this.WSize + 2).toString(), (this.HSize + 2).toString());
                return symbol;
            };
            NumberCards.prototype.MakeCardsSet = function (ids) {
                var symbol = new upred.ui.SVGSymbol(ids);
                for (var i = 5; i >= 0; i--) {
                    symbol.AddRectangle(2 + i + this.WSize * 0.25, 2 + this.HSize * 0.25, this.WSize, this.HSize, 'rgb(93, 173, 226)', 'black', 1);
                    symbol.subTag[symbol.subTag.length - 1].style.transformOrigin = '0px ' + this.HSize + 'px';
                    symbol.subTag[symbol.subTag.length - 1].style.transform = 'rotate(' + ((i - 2) * 5).toString() + 'deg)';
                }
                symbol.SetSize((this.WSize * 2).toString(), (this.HSize * 1.75).toString());
                return symbol;
            };
            NumberCards.prototype.HexToRGB = function (hex) {
                if (hex[0] == '#') {
                    var bigint = parseInt(hex.substring(1), 16);
                    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
                }
                else if (hex.indexOf('rgb') >= 0) {
                    var rgb = hex.substring(4, hex.length - 1)
                        .replace(/ /g, '')
                        .split(',');
                    return { r: rgb[0], g: rgb[1], b: rgb[2] };
                }
                return { r: 0, g: 0, b: 0 };
            };
            NumberCards.prototype.ChangeColor = function (item, colrstr) {
                var color = this.HexToRGB(colrstr);
                if (item.SetColor) {
                    item.SetColor(color.r, color.g, color.b);
                }
            };
            NumberCards.prototype.InitPalette = function () {
                this.WSize = Math.floor(window.innerWidth * 0.065);
                this.HSize = Math.floor(this.WSize / 0.65);
                this.svgCanvas = new upred.ui.SVGCanvas();
                this.paletteTag = document.getElementById('UI_PALETTE');
                var cardBack = new upred.ui.SVGSymbol('cardBack');
                cardBack.AddRectangle(2, 2, this.WSize, this.HSize);
                cardBack.SetSize((this.WSize + 2).toString(), (this.HSize + 2).toString());
                for (var i = 1; i <= 10; i++) {
                    this.MakeCard('cardFront' + (i == 10 ? 0 : i), i == 10 ? 0 : i);
                }
                for (var i = 1; i <= 10; i++) {
                    var card = new upred.ui.SVGUnit();
                    card.AddSymbol('cardBack');
                    card.AddSymbol('cardFront' + (i == 10 ? 0 : i));
                    card.GetTag().style.display = 'inline-block';
                    card.GetTag().style.margin = '8px';
                    card.GetTag().style.touchAction = 'none';
                    card.GetTag().setAttribute("pointer-events", "visiblePainted");
                    this.paletteTag.appendChild(card.GetTag());
                    card.GetTag().addEventListener('pointerdown', this.OnDragStartNew.bind(this));
                    card.SetViewBox(0, 0, this.WSize + 4, this.HSize + 4);
                    card.SetSize(this.WSize * 0.6, this.HSize * 0.6);
                }
                this.MakeCardsSet('cardSet');
                var cardSet = new upred.ui.SVGUnit();
                cardSet.AddSymbol('cardSet');
                cardSet.GetTag().style.display = 'inline-block';
                cardSet.GetTag().style.margin = '8px';
                cardSet.GetTag().style.touchAction = 'none';
                cardSet.GetTag().setAttribute("pointer-events", "visiblePainted");
                this.paletteTag.appendChild(cardSet.GetTag());
                cardSet.GetTag().addEventListener('pointerdown', this.OnDragStartNew.bind(this));
                cardSet.SetViewBox(0, 0, this.WSize * 1.7, this.HSize * 1.5);
                cardSet.SetSize(this.WSize * 0.8, this.HSize * 0.8);
                window.addEventListener('pointermove', this.OnDragging.bind(this));
                window.addEventListener('pointerup', this.OnDragEnd.bind(this));
                this.svgCanvas.dragStarter.use = this.OnDragStartMove.bind(this);
            };
            NumberCards.prototype.OnDragStartNew = function (e) {
                var _a;
                if (!e.currentTarget)
                    return;
                this.originalFigure = e.currentTarget;
                var xy = this.originalFigure.getBoundingClientRect();
                this.xyOrg.x = xy.left;
                this.xyOrg.y = xy.top;
                this.xyBefore.x = e.pageX;
                this.xyBefore.y = e.pageY;
                e.preventDefault();
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:900;');
                var tempParent = this.originalFigure.cloneNode(true);
                this.originalFigure = undefined;
                var tgroup = this.MakeNewGroup(this.xyOrg.x, this.xyOrg.y, tempParent);
                (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemOnlyOne(tgroup);
                this.dragMode = DragMode.NEW;
                this.curDraggingFigure = tgroup.groupTag;
                this.curDraggingFigure.style.opacity = '1';
                tgroup.SetColor(this.presetColors[0], this.presetColors[1], this.presetColors[2]);
                this.svgCanvas.GetTag().appendChild(this.curDraggingFigure);
            };
            NumberCards.prototype.OnDragStartMove = function (e) {
                var _a, _b;
                this.originalFigure = undefined;
                var usetag = e.target;
                if (!usetag)
                    return;
                this.curDraggingFigure = undefined;
                var tgroup = null;
                for (var i = 0; i < this.ncGroups.length; i++) {
                    if (this.ncGroups[i].groupTag == usetag.parentNode) {
                        tgroup = this.ncGroups[i];
                        this.curDraggingFigure = this.ncGroups[i].groupTag;
                        break;
                    }
                }
                if (this.curDraggingFigure == null) {
                    (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                    return false;
                }
                (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.SelectItemOnlyOne(tgroup);
                var p = this.svgCanvas.GetGroupPositionValue(this.curDraggingFigure);
                this.svgCanvas.SetGroupFront(this.curDraggingFigure);
                this.xyOrg.x = p.x;
                this.xyOrg.y = p.y;
                this.xyOrg.r = p.r;
                this.xyNow.x = this.xyBefore.x = e.pageX;
                this.xyNow.y = this.xyBefore.y = e.pageY;
                e.preventDefault();
                this.curDraggingFigure.style.opacity = '0.9';
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:900;');
                this.dragMode = DragMode.MOVE;
                return true;
            };
            NumberCards.prototype.OnDragging = function (e) {
                if (this.dragMode == DragMode.MOVE || this.dragMode == DragMode.NEW) {
                    this.xyNow.x = e.pageX;
                    this.xyNow.y = e.pageY;
                    var dx = this.xyNow.x - this.xyBefore.x;
                    var dy = this.xyNow.y - this.xyBefore.y;
                    this.svgCanvas.SetGroupPositionValue(this.curDraggingFigure, this.xyOrg.x + dx, this.xyOrg.y + dy);
                    var pos = this.curDraggingFigure.getBoundingClientRect();
                    var pPos = this.paletteTag.getBoundingClientRect();
                    if (pos.right < pPos.right && pos.top > pPos.top) {
                        this.curDraggingFigure.style.opacity = '0.5';
                    }
                    else {
                        this.curDraggingFigure.style.opacity = '1';
                    }
                    var tg = null;
                    for (var i = 0; i < this.ncGroups.length; i++) {
                        if (this.ncGroups[i].groupTag == this.curDraggingFigure) {
                            tg = this.ncGroups[i];
                            break;
                        }
                    }
                }
            };
            NumberCards.prototype.Shuffle = function (arr) {
                var count = arr.length;
                var temp = [];
                for (var i = 0; i < count; i++)
                    temp[i] = arr[i];
                for (var i = 0; i < count; i++) {
                    var a = temp.splice(Math.floor(Math.random() * temp.length), 1);
                    arr[i] = a[0];
                }
            };
            NumberCards.prototype.AddUseTag = function (href, group) {
                var usetag = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                usetag.setAttribute('href', href);
                group.groupTag.appendChild(usetag);
                usetag.setAttribute('x', '0');
                usetag.setAttribute('y', '0');
                upred.ui.HTML.setStyle(usetag, {
                    position: 'absolute',
                    opacity: '1',
                });
            };
            NumberCards.prototype.OnDragEnd = function (e) {
                var _a, _b, _c, _d;
                if (this.dragMode == DragMode.MOVE || this.dragMode == DragMode.NEW) {
                    var dx = this.xyNow.x - this.xyBefore.x;
                    var dy = this.xyNow.y - this.xyBefore.y;
                    if (this.curDraggingFigure != null) {
                        this.curDraggingFigure.style.opacity = '1';
                        var tg = null;
                        for (var i = 0; i < this.ncGroups.length; i++) {
                            if (this.ncGroups[i].groupTag == this.curDraggingFigure) {
                                tg = this.ncGroups[i];
                                break;
                            }
                        }
                        if (tg) {
                            (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                            var pos = this.curDraggingFigure.getBoundingClientRect();
                            var pPos = this.paletteTag.getBoundingClientRect();
                            if (pos.right < pPos.right && pos.top > pPos.top) {
                                this.svgCanvas.RemoveGroup(this.curDraggingFigure);
                                this.ncGroups.splice(this.ncGroups.indexOf(tg), 1);
                            }
                            else {
                                if (dx * dx + dy * dy < 32) {
                                    if (this.dragMode == DragMode.MOVE)
                                        tg.Flip(this.WSize);
                                    (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.SelectItemOnlyOne(tg);
                                }
                                if (tg.groupTag.children[0].getAttribute('href') == '#cardSet') {
                                    var oXY = this.svgCanvas.GetGroupPositionValue(tg.groupTag);
                                    var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                                    this.Shuffle(nums);
                                    (_c = upred.ui.uiModule) === null || _c === void 0 ? void 0 : _c.UnselectAll();
                                    for (var i = 0; i < 10; i++) {
                                        var col = i % 5;
                                        var row = Math.floor(i / 5);
                                        var nx = oXY.x + col * (this.WSize + 10);
                                        var ny = oXY.y + row * (this.HSize + 10);
                                        var ngroup = this.MakeNewGroupBase(nx, ny);
                                        this.AddUseTag('#cardFront' + nums[i], ngroup);
                                        this.AddUseTag('#cardBack', ngroup);
                                        ngroup.SetColor(this.presetColors[0], this.presetColors[1], this.presetColors[2]);
                                        this.svgCanvas.GetTag().appendChild(ngroup.groupTag);
                                        (_d = upred.ui.uiModule) === null || _d === void 0 ? void 0 : _d.SelectItemAdd(ngroup);
                                    }
                                    this.RemoveByGroupTag(tg.groupTag);
                                    this.svgCanvas.RemoveGroup(tg.groupTag);
                                }
                            }
                        }
                    }
                    this.originalFigure = undefined;
                    this.curDraggingFigure = undefined;
                    this.dragMode = DragMode.NONE;
                    this.EnableInteraction();
                    e.preventDefault();
                }
            };
            NumberCards.prototype.RemoveByGroupTag = function (grouptag) {
                var n = -1;
                for (var i = 0; i < this.ncGroups.length; i++) {
                    if (this.ncGroups[i].groupTag == grouptag) {
                        n = i;
                        break;
                    }
                }
                if (n >= 0)
                    this.ncGroups.splice(n, 1);
            };
            NumberCards.prototype.MakeNewGroupBase = function (x, y) {
                var group = new NCGroup(this.svgCanvas);
                group.highlighter = this.ShowHighlighted.bind(this);
                group.deleteHandler = this.Delete.bind(this);
                group.duplicateHandler = this.Duplicate.bind(this);
                group.rotateHandler = this.Rotate.bind(this);
                group.colorChanger = this.ChangeColor.bind(this);
                this.svgCanvas.SetGroupPositionValue(group.groupTag, x, y);
                this.ncGroups.push(group);
                return group;
            };
            NumberCards.prototype.MakeNewGroup = function (x, y, oldParent) {
                var group = this.MakeNewGroupBase(x, y);
                if (oldParent) {
                    while (oldParent.firstChild) {
                        group.groupTag.appendChild(oldParent.firstChild);
                    }
                    group.groupType = GroupType.FRONT;
                }
                else {
                    group.groupTag.appendChild(this.curDraggingFigure);
                    this.curDraggingFigure.setAttribute('x', '0');
                    this.curDraggingFigure.setAttribute('y', '0');
                    upred.ui.HTML.setStyle(this.curDraggingFigure, {
                        position: 'absolute',
                        opacity: '1',
                    });
                }
                return group;
            };
            NumberCards.prototype.ShowHighlighted = function (group, flag) {
                if (group) {
                    if (flag) {
                        group.groupTag.setAttribute('filter', 'url(#filterOutline)');
                    }
                    else {
                        group.groupTag.setAttribute('filter', '');
                    }
                }
            };
            NumberCards.prototype.SetSelectionBy = function (x, y, w, h) {
                var _a;
                for (var i = 0; i < this.ncGroups.length; i++) {
                    var ar = this.ncGroups[i].groupTag.getBoundingClientRect();
                    if (!(x > ar.right ||
                        x + w < ar.left ||
                        y > ar.bottom ||
                        y + h < ar.top)) {
                        (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemAdd(this.ncGroups[i]);
                    }
                }
            };
            NumberCards.prototype.Rotate = function (group, degree) {
                var targetRoot = group.groupTag;
                if (targetRoot != null) {
                    var xyr = this.svgCanvas.GetGroupPositionValue(targetRoot);
                    this.svgCanvas.SetGroupRotationValue(targetRoot, xyr.r + degree);
                }
            };
            NumberCards.prototype.Delete = function (targetGroup) {
                if (targetGroup != null && this.ncGroups.indexOf(targetGroup) >= 0) {
                    this.svgCanvas.RemoveGroup(targetGroup.groupTag);
                    this.ncGroups.splice(this.ncGroups.indexOf(targetGroup), 1);
                }
            };
            NumberCards.prototype.Duplicate = function (targetGroup) {
                var _a, _b;
                if (targetGroup != null) {
                    var xy = this.svgCanvas.GetGroupPositionValue(targetGroup.groupTag);
                    var groupB = this.MakeNewGroupBase(xy.x, xy.y);
                    groupB.groupType = targetGroup.groupType;
                    var cTags = [];
                    for (var i = targetGroup.groupTag.children.length - 1, j = 0; i >= 0; i--, j++) {
                        cTags.push(targetGroup.groupTag.children[i].cloneNode(true));
                    }
                    for (var i = cTags.length - 1; i >= 0; i--) {
                        groupB.groupTag.appendChild(cTags[i]);
                    }
                    this.svgCanvas.SetGroupPositionValue(groupB.groupTag, xy.x, xy.y);
                    this.svgCanvas.SetGroupRotationWithPivot(groupB.groupTag, xy.r, xy.x, xy.y);
                    var xy2 = this.svgCanvas.GetGroupPositionValue(groupB.groupTag);
                    this.svgCanvas.SetGroupPositionValue(groupB.groupTag, xy2.x + this.WSize / 5, xy2.y + this.WSize / 5);
                    (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemAdd(targetGroup);
                    (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.duplicated.push(groupB);
                }
            };
            NumberCards.prototype.RestoreInitialState = function () {
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:400;');
                for (var i = 0; i < this.ncGroups.length; i++) {
                    this.svgCanvas.RemoveGroup(this.ncGroups[i].groupTag);
                }
                this.ncGroups = [];
            };
            NumberCards.prototype.EnableInteraction = function () {
                this.svgCanvas.MoveToFront();
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:750;');
            };
            NumberCards.prototype.DisableInteraction = function () {
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:400;');
            };
            NumberCards.prototype.Init = function () {
                var _a;
                (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.DisableRotation();
                this.InitPalette();
                upred.ui.GuideViewer.Show('./asset/guide.png');
            };
            return NumberCards;
        }());
        math.NumberCards = NumberCards;
    })(math = upred.math || (upred.math = {}));
})(upred || (upred = {}));
//# sourceMappingURL=numbercards.js.map