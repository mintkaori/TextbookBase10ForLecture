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
            GroupType[GroupType["LINE"] = 1] = "LINE";
            GroupType[GroupType["ARROW_RIGHT"] = 2] = "ARROW_RIGHT";
            GroupType[GroupType["ARROW_LEFT"] = 3] = "ARROW_LEFT";
        })(GroupType || (GroupType = {}));
        var DragMode;
        (function (DragMode) {
            DragMode[DragMode["NONE"] = 0] = "NONE";
            DragMode[DragMode["MOVE"] = 1] = "MOVE";
            DragMode[DragMode["NEW"] = 2] = "NEW";
            DragMode[DragMode["STRETCH_RIGHT"] = 3] = "STRETCH_RIGHT";
            DragMode[DragMode["STRETCH_LEFT"] = 4] = "STRETCH_LEFT";
            DragMode[DragMode["ARROW_SP"] = 5] = "ARROW_SP";
            DragMode[DragMode["ARROW_EP"] = 6] = "ARROW_EP";
            DragMode[DragMode["ARROW_MP"] = 7] = "ARROW_MP";
        })(DragMode || (DragMode = {}));
        var LineGroup = (function () {
            function LineGroup(canvas) {
                this.SPLITTER_HEIGHT_HALF = 8;
                this.LINE_THICKNESS = 3;
                this.nStart = 0;
                this.nCount = 10;
                this.nAdd = 1;
                this.preStart = 0;
                this.preCount = 0;
                this.nCellWidth = 30;
                this.lastCellW = 30;
                this.nSubdivider = 1;
                this.rgb = { r: 0, g: 0, b: 0 };
                this.isMultipleArrow = false;
                this.arrowCount = 0;
                this.preArrowCount = 0;
                this.arrowPosition = {
                    sp: 0, ep: 0, preSp: 0, preEp: 0
                };
                this.zoomN = 0;
                this.svgCanvas = canvas;
                this.groupTag = canvas.AddGroup();
                this.groupType = GroupType.NONE;
                upred.ui.HTML.setStyle(this.groupTag, {
                    position: 'absolute',
                });
                this.eventAreaTag = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                this.groupTag.appendChild(this.eventAreaTag);
                this.attachedArrowsBySP = [];
                this.attachedArrowsByEP = [];
                this.attachedArrowsBySPOldXY = [];
                this.attachedArrowsByEPOldXY = [];
                this.groupType = GroupType.NONE;
            }
            LineGroup.prototype.ContainsChild = function (el) {
                if (!el)
                    return false;
                if (this.eventAreaTag.contains(el))
                    return true;
                return false;
            };
            LineGroup.prototype.MakeTagStyled = function (parent, tagname, attr, style) {
                var node = document.createElementNS('http://www.w3.org/2000/svg', tagname);
                for (var key in attr) {
                    if (attr.hasOwnProperty(key)) {
                        node.setAttribute(key, attr[key]);
                    }
                }
                for (var key in style) {
                    if (style.hasOwnProperty(key)) {
                        node.style[key] = style[key];
                    }
                }
                parent.appendChild(node);
                return node;
            };
            LineGroup.prototype.Duplicate = function () {
                var dup = new LineGroup(this.svgCanvas);
                if (this.groupType == GroupType.LINE) {
                    dup.zoomN = this.zoomN;
                    dup.MakeLine(this.nCellWidth, this.nStart, this.nCount, this.nAdd, this.nSubdivider);
                    dup.SetColor(this.rgb.r, this.rgb.g, this.rgb.b);
                }
                else {
                    dup.arrowParentTag = this.arrowParentTag.cloneNode(true);
                    dup.eventAreaTag = this.eventAreaTag.cloneNode(true);
                    dup.groupTag.appendChild(dup.arrowParentTag);
                    dup.groupTag.appendChild(dup.eventAreaTag);
                    dup.groupType = this.groupType;
                    dup.arrowPosition.sp = this.arrowPosition.sp;
                    dup.arrowPosition.ep = this.arrowPosition.ep;
                    dup.arrowPosition.preSp = this.arrowPosition.preSp;
                    dup.arrowPosition.preEp = this.arrowPosition.preEp;
                    dup.arrowCount = this.arrowCount;
                    dup.arrowParentTag.children[dup.arrowParentTag.children.length - 3].onpointerdown = dup.OnArrowSPDown.bind(dup);
                    dup.arrowParentTag.children[dup.arrowParentTag.children.length - 2].onpointerdown = dup.OnArrowEPDown.bind(dup);
                    dup.arrowParentTag.children[1].onpointerdown = dup.OnArrowEPDown.bind(dup);
                    if (this.isMultipleArrow) {
                        dup.isMultipleArrow = true;
                        dup.arrowParentTag.children[dup.arrowParentTag.children.length - 1].onpointerdown = dup.OnArrowMPDown.bind(dup);
                        dup.arrowParentTag.children[dup.arrowParentTag.children.length - 4].onpointerdown = dup.OnArrowMPDown.bind(dup);
                    }
                }
                return dup;
            };
            LineGroup.prototype.ApplyAttachedResizing = function () {
                var myXY = this.svgCanvas.GetGroupPositionValue(this.groupTag);
                var ratio = this.GetCellWidth() / this.lastCellW;
                this.lastCellW = this.GetCellWidth();
                var resized = [];
                for (var i = 0; i < this.attachedArrowsBySP.length; i++) {
                    var al = this.attachedArrowsBySP[i];
                    if (al.groupType != GroupType.ARROW_LEFT && al.groupType != GroupType.ARROW_RIGHT)
                        continue;
                    var XY = this.svgCanvas.GetGroupPositionValue(al.groupTag);
                    var sx = XY.x + al.arrowPosition.sp - myXY.x;
                    var ex = XY.x + al.arrowPosition.ep - myXY.x;
                    var newSX = sx * ratio;
                    var newEX = ex * ratio;
                    al.ResizeArrowLine(newSX + myXY.x - XY.x, newEX + myXY.x - XY.x);
                    resized.push(al);
                }
                for (var i = 0; i < this.attachedArrowsByEP.length; i++) {
                    var al = this.attachedArrowsByEP[i];
                    if (al.groupType != GroupType.ARROW_LEFT && al.groupType != GroupType.ARROW_RIGHT)
                        continue;
                    if (resized.indexOf(al) >= 0)
                        continue;
                    var XY = this.svgCanvas.GetGroupPositionValue(al.groupTag);
                    var sx = XY.x + al.arrowPosition.sp - myXY.x;
                    var ex = XY.x + al.arrowPosition.ep - myXY.x;
                    var newSX = sx * ratio;
                    var newEX = ex * ratio;
                    al.ResizeArrowLine(newSX + myXY.x - XY.x, newEX + myXY.x - XY.x);
                }
            };
            LineGroup.prototype.ZoomIn = function () {
                this.zoomN++;
                this.ChangeLine(this.nCellWidth, this.nStart, this.nCount, this.nAdd, this.nSubdivider, true);
                this.ApplyAttachedResizing();
            };
            LineGroup.prototype.ZoomOut = function () {
                this.zoomN--;
                this.ChangeLine(this.nCellWidth, this.nStart, this.nCount, this.nAdd, this.nSubdivider, true);
                this.ApplyAttachedResizing();
            };
            LineGroup.prototype.GetCellWidth = function () {
                return this.nCellWidth * Math.pow(1.1, this.zoomN);
            };
            LineGroup.prototype.ChangeLine = function (unitWidth, startNo, countNo, addNo, subDivider, forceRefresh) {
                var _a, _b;
                if (!forceRefresh
                    && unitWidth == this.nCellWidth
                    && startNo == this.nStart
                    && countNo == this.nCount
                    && addNo == this.nAdd
                    && subDivider == this.nSubdivider)
                    return;
                if (countNo < 1)
                    return;
                this.nCellWidth = unitWidth;
                var rw = unitWidth * Math.pow(1.1, this.zoomN);
                this.nStart = startNo;
                this.nAdd = addNo;
                this.nCount = countNo;
                this.nSubdivider = subDivider;
                var totalLength = rw * this.nCount;
                this.eventAreaTag.firstChild.setAttribute('width', totalLength.toString());
                this.lineParentTag.firstChild.setAttribute('x2', totalLength.toString());
                var N = 1, T = 0;
                for (var i = 0; i <= countNo; i++) {
                    var x = i * rw;
                    if (N >= this.lineParentTag.children.length) {
                        var splitter = this.MakeTagStyled(this.lineParentTag, 'line', {
                            x1: x.toString(),
                            y1: 0,
                            x2: x.toString(),
                            y2: (this.SPLITTER_HEIGHT_HALF * 2 + this.LINE_THICKNESS - 1).toString()
                        }, {
                            fill: 'none',
                            strokeWidth: '3',
                            strokeLinecap: 'butt',
                            strokeLinejoin: 'bevel',
                            userSelect: 'none',
                            touchAction: 'none',
                            pointerEvents: 'none'
                        });
                    }
                    else {
                        this.lineParentTag.children[N].setAttribute('x1', x.toString());
                        this.lineParentTag.children[N].setAttribute('y1', '0');
                        this.lineParentTag.children[N].setAttribute('x2', x.toString());
                        this.lineParentTag.children[N].setAttribute('y2', (this.SPLITTER_HEIGHT_HALF * 2 + this.LINE_THICKNESS - 1).toString());
                        this.lineParentTag.children[N].style.strokeWidth = '3';
                    }
                    N++;
                    if (subDivider > 1 && i < countNo) {
                        var subwidth = rw / subDivider;
                        for (var j = 1; j < subDivider; j++) {
                            var subx = x + subwidth * j;
                            if (N >= this.lineParentTag.children.length) {
                                var subsplitter = this.MakeTagStyled(this.lineParentTag, 'line', {
                                    x1: subx.toString(),
                                    y1: this.SPLITTER_HEIGHT_HALF / 2 - 1,
                                    x2: subx.toString(),
                                    y2: (this.SPLITTER_HEIGHT_HALF + this.LINE_THICKNESS + this.SPLITTER_HEIGHT_HALF / 2 - 1).toString()
                                }, {
                                    fill: 'none',
                                    strokeWidth: '1',
                                    strokeLinecap: 'butt',
                                    strokeLinejoin: 'bevel',
                                    userSelect: 'none',
                                    touchAction: 'none',
                                    pointerEvents: 'none'
                                });
                            }
                            else {
                                this.lineParentTag.children[N].setAttribute('x1', subx.toString());
                                this.lineParentTag.children[N].setAttribute('y1', (this.SPLITTER_HEIGHT_HALF / 2).toString());
                                this.lineParentTag.children[N].setAttribute('x2', subx.toString());
                                this.lineParentTag.children[N].setAttribute('y2', (this.SPLITTER_HEIGHT_HALF + this.LINE_THICKNESS + this.SPLITTER_HEIGHT_HALF / 2 - 1).toString());
                                this.lineParentTag.children[N].style.strokeWidth = '1';
                            }
                            N++;
                        }
                    }
                    if (T >= this.labelParentTag.children.length) {
                        var label = this.MakeTagStyled(this.labelParentTag, 'text', {
                            x: (i < 0 ? x - 5 : x).toString(),
                            y: (this.SPLITTER_HEIGHT_HALF * 2 + this.LINE_THICKNESS).toString(),
                            'dominant-baseline': 'hanging',
                            'text-anchor': 'middle',
                        }, {
                            strokeWidth: '0',
                            font: 'bold 28px sans-serif',
                            cursor: 'pointer',
                            userSelect: 'none',
                            touchAction: 'none',
                            pointerEvents: 'none'
                        });
                        label.textContent = (this.nStart + i * this.nAdd).toString();
                    }
                    else {
                        this.labelParentTag.children[T].setAttribute('x', (i < 0 ? x - 5 : x).toString());
                        this.labelParentTag.children[T].textContent = (this.nStart + i * this.nAdd).toString();
                    }
                    T++;
                }
                if (N < this.lineParentTag.children.length) {
                    var toremove = [];
                    for (var i = N; i < this.lineParentTag.children.length; i++) {
                        toremove.push(this.lineParentTag.children[i]);
                    }
                    for (var i = 0; i < toremove.length; i++) {
                        this.lineParentTag.removeChild(toremove[i]);
                    }
                }
                if (T < this.labelParentTag.children.length) {
                    var toremove = [];
                    for (var i = T; i < this.labelParentTag.children.length; i++) {
                        toremove.push(this.labelParentTag.children[i]);
                    }
                    for (var i = 0; i < toremove.length; i++) {
                        this.labelParentTag.removeChild(toremove[i]);
                    }
                }
                (_a = this.expandLeft) === null || _a === void 0 ? void 0 : _a.setAttribute('x', (-upred.ui.mathModule.LRButtonSize).toString());
                (_b = this.expandRight) === null || _b === void 0 ? void 0 : _b.setAttribute('x', totalLength.toString());
            };
            LineGroup.prototype.ResetArrowPosition = function () {
                var sp = parseFloat(this.arrowParentTag.children[1].getAttribute('cx'));
                var ep = parseFloat(this.arrowParentTag.children[3].getAttribute('cx'));
                var dx = -sp;
                sp = 0;
                ep += dx;
                this.ResizeArrowLine(sp, ep);
                return ep;
            };
            LineGroup.prototype.ResizeArrowLine = function (sp, ep) {
                this.arrowPosition.sp = sp;
                this.arrowPosition.ep = ep;
                var h = 40 + Math.max(0, Math.abs(ep - sp) - 40) * 0.3;
                var ar = 0, dx = 0;
                if (this.groupType == GroupType.ARROW_RIGHT) {
                    if (ep > sp) {
                        h = -h;
                        ar = -20;
                        dx = -4;
                    }
                    else {
                        ar = 160;
                        dx = 4;
                    }
                }
                if (this.groupType == GroupType.ARROW_LEFT) {
                    if (ep < sp) {
                        h = -h;
                        ar = 20;
                        dx = 4;
                    }
                    else {
                        ar = 200;
                        dx = -4;
                    }
                }
                this.eventAreaTag.firstChild.setAttribute('x', (sp < ep ? Math.min(sp, ep) : -Math.abs(ep - sp) * this.arrowCount).toString());
                this.eventAreaTag.firstChild.setAttribute('y', h < 0 ? h.toString() : '0');
                this.eventAreaTag.firstChild.setAttribute('width', (Math.abs(ep - sp) * this.arrowCount).toString());
                this.eventAreaTag.firstChild.setAttribute('height', Math.abs(h / 2).toString());
                this.arrowParentTag.children[this.arrowParentTag.children.length - 3].setAttribute('cx', sp.toString());
                this.arrowParentTag.children[this.arrowParentTag.children.length - 2].setAttribute('cx', ep.toString());
                if (this.isMultipleArrow) {
                    this.arrowParentTag.children[this.arrowParentTag.children.length - 1].setAttribute('cx', (sp + (ep - sp) * this.arrowCount).toString());
                }
                var dist = ep - sp;
                for (var i = 0; i < this.arrowCount; i++) {
                    var px = [
                        sp, 0,
                        Math.floor(sp + (ep - sp) * 0.1), h,
                        Math.floor(ep - (ep - sp) * 0.1) + dx, h,
                        ep + dx, h > 0 ? 10 : -10,
                    ];
                    var d = 'M ' + px[0] + ' ' + px[1] + ' C';
                    for (var i_1 = 2; i_1 < px.length; i_1 += 2) {
                        d += ' ' + px[i_1] + ' ' + px[i_1 + 1];
                    }
                    this.arrowParentTag.children[i * 2].setAttribute('d', d);
                    this.arrowParentTag.children[i * 2 + 1].setAttribute('transform', 'translate(' + ep + ',0) rotate(' + ar + ')');
                    sp += dist;
                    ep += dist;
                }
            };
            LineGroup.prototype.ChangeArrowCount = function (n) {
                if (n == this.arrowCount)
                    return;
                if (n < 1)
                    return;
                var spc = this.arrowParentTag.children[this.arrowParentTag.children.length - 3];
                var epc = this.arrowParentTag.children[this.arrowParentTag.children.length - 2];
                var mpc = this.arrowParentTag.children[this.arrowParentTag.children.length - 1];
                var bk = [];
                for (var i = 0; i < this.arrowParentTag.children.length - 3; i++) {
                    bk[i] = this.arrowParentTag.children[i];
                }
                while (this.arrowParentTag.firstChild)
                    this.arrowParentTag.removeChild(this.arrowParentTag.firstChild);
                var dist = this.arrowPosition.preEp - this.arrowPosition.preSp;
                for (var i = 0; i < n; i++) {
                    var spn = this.arrowPosition.preSp + i * dist;
                    var epn = spn + dist;
                    if (bk.length > i * 2) {
                        this.arrowParentTag.appendChild(bk[i * 2]);
                        this.arrowParentTag.appendChild(bk[i * 2 + 1]);
                        if (i == 0)
                            bk[i * 2 + 1].style.cursor = 'ew-resize';
                        else
                            bk[i * 2 + 1].style.cursor = 'default';
                        bk[i * 2 + 1].onpointerdown = null;
                    }
                    else
                        this.MakeArrowLine(spn, epn, this.groupType, i + 1, n);
                }
                this.arrowParentTag.appendChild(spc);
                this.arrowParentTag.appendChild(epc);
                this.arrowParentTag.appendChild(mpc);
                this.arrowParentTag.children[1].onpointerdown = this.OnArrowEPDown.bind(this);
                this.arrowParentTag.children[this.arrowParentTag.children.length - 4].onpointerdown = this.OnArrowMPDown.bind(this);
                this.arrowParentTag.children[this.arrowParentTag.children.length - 4].style.cursor = 'ew-resize';
                this.arrowParentTag.lastChild.onpointerdown = this.OnArrowMPDown.bind(this);
                mpc.setAttribute('cx', (this.arrowPosition.preSp + dist * n).toString());
                this.arrowPosition.sp = this.arrowPosition.preSp;
                this.arrowPosition.ep = this.arrowPosition.preEp;
                this.arrowCount = n;
                this.eventAreaTag.firstChild.setAttribute('x', (this.arrowPosition.preSp < this.arrowPosition.preEp ? Math.min(this.arrowPosition.preSp, this.arrowPosition.preEp) : -Math.abs(this.arrowPosition.preEp - this.arrowPosition.preSp) * this.arrowCount).toString());
                this.eventAreaTag.firstChild.setAttribute('width', (Math.abs(this.arrowPosition.preEp - this.arrowPosition.preSp) * this.arrowCount).toString());
            };
            LineGroup.prototype.MakeArrowLineMulti = function (sp, ep, arrowType, count) {
                var dist = ep - sp;
                for (var i = 0; i < count; i++) {
                    var spn = sp + i * dist;
                    var epn = spn + dist;
                    this.MakeArrowLine(spn, epn, arrowType, i + 1, count);
                }
                this.arrowPosition.sp = sp;
                this.arrowPosition.ep = ep;
                this.MakeArrowPoint(sp, ep, count);
                this.isMultipleArrow = true;
            };
            LineGroup.prototype.MakeArrowPoint = function (sp, ep, count) {
                var spCircle = this.MakeTagStyled(this.arrowParentTag, 'circle', {
                    cx: sp.toString(), cy: '0', r: '7'
                }, {
                    strokeWidth: '0',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'bevel',
                    userSelect: 'none',
                    touchAction: 'none',
                    cursor: 'ew-resize'
                });
                spCircle.onpointerdown = this.OnArrowSPDown.bind(this);
                var epCircle = this.MakeTagStyled(this.arrowParentTag, 'circle', {
                    cx: ep.toString(), cy: '0', r: '7'
                }, {
                    fill: 'transparent',
                    strokeWidth: '0',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'bevel',
                    userSelect: 'none',
                    touchAction: 'none',
                    cursor: 'ew-resize'
                });
                epCircle.onpointerdown = this.OnArrowEPDown.bind(this);
                if (count > 1) {
                    ep = sp + (ep - sp) * count;
                    var mpCircle = this.MakeTagStyled(this.arrowParentTag, 'circle', {
                        cx: ep.toString(), cy: '0', r: '7'
                    }, {
                        fill: 'transparent',
                        strokeWidth: '0',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'bevel',
                        userSelect: 'none',
                        touchAction: 'none',
                        cursor: 'ew-resize'
                    });
                    mpCircle.onpointerdown = this.OnArrowMPDown.bind(this);
                }
                else {
                    var mpCircle = this.MakeTagStyled(this.arrowParentTag, 'circle', {
                        cx: ep.toString(), cy: '0', r: '7'
                    }, {
                        display: 'none',
                        userSelect: 'none',
                        touchAction: 'none',
                        pointerEvents: 'none'
                    });
                }
            };
            LineGroup.prototype.MakeArrowLine = function (sp, ep, arrowType, index, count) {
                this.groupType = arrowType;
                this.arrowPosition.sp = sp;
                this.arrowPosition.ep = ep;
                this.arrowCount = count;
                var h = 40 + Math.max(0, Math.abs(ep - sp) - 40) * 0.3;
                var ar = 0, dx = 0;
                if (arrowType == GroupType.ARROW_RIGHT) {
                    if (ep > sp) {
                        h = -h;
                        ar = -20;
                        dx = -4;
                    }
                    else {
                        ar = 160;
                        dx = 4;
                    }
                }
                if (arrowType == GroupType.ARROW_LEFT) {
                    if (ep < sp) {
                        h = -h;
                        ar = 20;
                        dx = 4;
                    }
                    else {
                        ar = 200;
                        dx = -4;
                    }
                }
                var px = [
                    sp, 0,
                    Math.floor(sp + (ep - sp) * 0.1), h,
                    Math.floor(ep - (ep - sp) * 0.1) + (h > 0 ? 3 : -3), h,
                    ep + dx, h > 0 ? 10 : -10,
                ];
                var d = 'M ' + px[0] + ' ' + px[1] + ' C';
                for (var i = 2; i < px.length; i += 2) {
                    d += ' ' + px[i] + ' ' + px[i + 1];
                }
                if (index == 1) {
                    this.MakeTagStyled(this.eventAreaTag, 'rect', {
                        x: (sp < ep ? Math.min(sp, ep) : -Math.abs(ep - sp) * count).toString(),
                        y: h < 0 ? h.toString() : '0',
                        width: (Math.abs(ep - sp) * count).toString(),
                        height: Math.abs(h / 2).toString(),
                        fill: 'transparent',
                        stroke: 'none'
                    }, {
                        touchAction: 'none',
                        userSelect: 'none',
                        cursor: 'pointer'
                    });
                    this.arrowParentTag = this.MakeTagStyled(this.groupTag, 'g', {}, {});
                }
                var path = this.MakeTagStyled(this.arrowParentTag, 'path', {
                    d: d
                }, {
                    fill: 'none',
                    strokeWidth: '5',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'bevel',
                    userSelect: 'none',
                    touchAction: 'none',
                    pointerEvents: 'none'
                });
                var arrow = this.MakeTagStyled(this.arrowParentTag, 'path', {
                    d: 'M 0 0 L -10 -20 L 0 -15 L 10 -20 Z',
                    transform: 'translate(' + ep + ',0) rotate(' + ar + ')'
                }, {
                    strokeWidth: '0',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'miter',
                    userSelect: 'none',
                    touchAction: 'none',
                    cursor: (index == 1 || count == index) ? 'ew-resize' : 'default'
                });
                if (count == 1)
                    this.MakeArrowPoint(sp, ep, count);
                if (index == count && count > 1)
                    arrow.onpointerdown = this.OnArrowMPDown.bind(this);
                else if (index == 1)
                    arrow.onpointerdown = this.OnArrowEPDown.bind(this);
            };
            LineGroup.prototype.MakeLine = function (unitWidth, startNo, countNo, addNo, subDivider) {
                this.nCellWidth = unitWidth;
                this.lastCellW = unitWidth;
                this.nStart = startNo;
                this.nAdd = addNo;
                this.nSubdivider = subDivider;
                this.nCount = countNo;
                var rw = unitWidth * Math.pow(1.1, this.zoomN);
                var totalLength = rw * this.nCount;
                this.groupType = GroupType.LINE;
                this.MakeTagStyled(this.eventAreaTag, 'rect', {
                    x: '0', y: '0',
                    width: totalLength.toString(),
                    height: (this.SPLITTER_HEIGHT_HALF * 2 + this.LINE_THICKNESS + 20).toString(),
                    fill: 'transparent',
                    stroke: 'none'
                }, {
                    touchAction: 'none',
                    userSelect: 'none',
                    cursor: 'move'
                });
                this.lineParentTag = this.MakeTagStyled(this.groupTag, 'g', {}, {});
                var mainline = this.MakeTagStyled(this.lineParentTag, 'line', {
                    x1: '0',
                    y1: this.SPLITTER_HEIGHT_HALF.toString(),
                    x2: totalLength.toString(),
                    y2: this.SPLITTER_HEIGHT_HALF.toString()
                }, {
                    fill: 'none',
                    strokeWidth: '3',
                    strokeLinecap: 'butt',
                    strokeLinejoin: 'bevel',
                    userSelect: 'none',
                    touchAction: 'none',
                    pointerEvents: 'none'
                });
                if (countNo < 1)
                    return;
                this.nCount = countNo;
                this.labelParentTag = this.MakeTagStyled(this.groupTag, 'g', {}, {});
                for (var i = 0; i <= this.nCount; i++) {
                    var x = i * rw;
                    var num = this.nStart + i * this.nAdd;
                    var splitter = this.MakeTagStyled(this.lineParentTag, 'line', {
                        x1: x.toString(),
                        y1: 0,
                        x2: x.toString(),
                        y2: (this.SPLITTER_HEIGHT_HALF * 2 + this.LINE_THICKNESS - 1).toString()
                    }, {
                        fill: 'none',
                        strokeWidth: '3',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'bevel',
                        userSelect: 'none',
                        touchAction: 'none',
                        pointerEvents: 'none'
                    });
                    if (subDivider > 1 && i < this.nCount) {
                        var subwidth = rw / subDivider;
                        for (var j = 1; j < subDivider; j++) {
                            var subx = x + subwidth * j;
                            var subsplitter = this.MakeTagStyled(this.lineParentTag, 'line', {
                                x1: subx.toString(),
                                y1: this.SPLITTER_HEIGHT_HALF / 2 - 1,
                                x2: subx.toString(),
                                y2: (this.SPLITTER_HEIGHT_HALF + this.LINE_THICKNESS + this.SPLITTER_HEIGHT_HALF / 2 - 1).toString()
                            }, {
                                fill: 'none',
                                strokeWidth: '1',
                                strokeLinecap: 'butt',
                                strokeLinejoin: 'bevel',
                                userSelect: 'none',
                                touchAction: 'none',
                                pointerEvents: 'none'
                            });
                        }
                    }
                    var label = this.MakeTagStyled(this.labelParentTag, 'text', {
                        x: (i < 0 ? x - 5 : x).toString(),
                        y: (this.SPLITTER_HEIGHT_HALF * 2 + this.LINE_THICKNESS).toString(),
                        'dominant-baseline': 'hanging',
                        'text-anchor': 'middle',
                    }, {
                        strokeWidth: '0',
                        font: 'bold 28px sans-serif',
                        cursor: 'pointer',
                        userSelect: 'none',
                        touchAction: 'none',
                        pointerEvents: 'none'
                    });
                    label.textContent = num.toString();
                }
                this.expandLeft = this.MakeTagStyled(this.groupTag, 'use', {
                    x: (-upred.ui.mathModule.LRButtonSize),
                    y: '-2',
                    href: '#buttonExpandLeft'
                }, {
                    userSelect: 'none',
                    touchAction: 'none',
                    cursor: 'ew-resize',
                    display: 'none'
                });
                this.expandRight = this.MakeTagStyled(this.groupTag, 'use', {
                    x: (totalLength).toString(),
                    y: '-2',
                    href: '#buttonExpandRight'
                }, {
                    userSelect: 'none',
                    touchAction: 'none',
                    cursor: 'ew-resize',
                    display: 'none'
                });
                this.expandLeft.onpointerdown = this.OnExpandLeftDown.bind(this);
                this.expandRight.onpointerdown = this.OnExpandRightDown.bind(this);
            };
            LineGroup.prototype.OnArrowSPDown = function (e) {
                e.stopPropagation();
                e.preventDefault();
                upred.ui.mathModule.curDraggingGroup = this;
                upred.ui.mathModule.dragMode = DragMode.ARROW_SP;
                upred.ui.mathModule.xyBefore.x = e.pageX;
                upred.ui.mathModule.xyBefore.y = e.pageY;
                var xy = this.svgCanvas.GetGroupPositionValue(this.groupTag);
                upred.ui.mathModule.xyOrg.x = xy.x;
                upred.ui.mathModule.xyOrg.y = xy.y;
                this.arrowPosition.preSp = this.arrowPosition.sp;
                this.arrowPosition.preEp = this.arrowPosition.ep;
                this.preArrowCount = this.arrowCount;
                this.arrowParentTag.children[this.arrowParentTag.children.length - 3].style.fill = 'black';
            };
            LineGroup.prototype.OnArrowEPDown = function (e) {
                e.stopPropagation();
                e.preventDefault();
                upred.ui.mathModule.curDraggingGroup = this;
                upred.ui.mathModule.dragMode = DragMode.ARROW_EP;
                upred.ui.mathModule.xyBefore.x = e.pageX;
                upred.ui.mathModule.xyBefore.y = e.pageY;
                var xy = this.svgCanvas.GetGroupPositionValue(this.groupTag);
                upred.ui.mathModule.xyOrg.x = xy.x;
                upred.ui.mathModule.xyOrg.y = xy.y;
                this.arrowPosition.preSp = this.arrowPosition.sp;
                this.arrowPosition.preEp = this.arrowPosition.ep;
                this.preArrowCount = this.arrowCount;
                this.arrowParentTag.children[this.arrowParentTag.children.length - 2].style.fill = 'black';
            };
            LineGroup.prototype.OnArrowMPDown = function (e) {
                e.stopPropagation();
                e.preventDefault();
                upred.ui.mathModule.curDraggingGroup = this;
                upred.ui.mathModule.dragMode = DragMode.ARROW_MP;
                upred.ui.mathModule.xyBefore.x = e.pageX;
                upred.ui.mathModule.xyBefore.y = e.pageY;
                var xy = this.svgCanvas.GetGroupPositionValue(this.groupTag);
                upred.ui.mathModule.xyOrg.x = xy.x;
                upred.ui.mathModule.xyOrg.y = xy.y;
                this.arrowPosition.preSp = this.arrowPosition.sp;
                this.arrowPosition.preEp = this.arrowPosition.ep;
                this.preArrowCount = this.arrowCount;
                this.arrowParentTag.lastChild.style.fill = 'black';
            };
            LineGroup.prototype.OnExpandLeftDown = function (e) {
                e.stopPropagation();
                e.preventDefault();
                upred.ui.mathModule.curDraggingGroup = this;
                upred.ui.mathModule.dragMode = DragMode.STRETCH_LEFT;
                upred.ui.mathModule.xyBefore.x = e.pageX;
                upred.ui.mathModule.xyBefore.y = e.pageY;
                var xy = this.svgCanvas.GetGroupPositionValue(this.groupTag);
                upred.ui.mathModule.xyOrg.x = xy.x;
                upred.ui.mathModule.xyOrg.y = xy.y;
                this.preStart = this.nStart;
                this.preCount = this.nCount;
            };
            LineGroup.prototype.OnExpandRightDown = function (e) {
                e.stopPropagation();
                e.preventDefault();
                upred.ui.mathModule.curDraggingGroup = this;
                upred.ui.mathModule.dragMode = DragMode.STRETCH_RIGHT;
                upred.ui.mathModule.xyBefore.x = e.pageX;
                upred.ui.mathModule.xyBefore.y = e.pageY;
                var xy = this.svgCanvas.GetGroupPositionValue(this.groupTag);
                upred.ui.mathModule.xyOrg.x = xy.x;
                upred.ui.mathModule.xyOrg.y = xy.y;
                this.preStart = this.nStart;
                this.preCount = this.nCount;
            };
            LineGroup.prototype.Highlight = function (flag) {
                var _a, _b;
                if (flag) {
                    if (this.groupType == GroupType.LINE) {
                        if (this.nStart != 0)
                            this.expandLeft.style.display = 'block';
                        this.expandRight.style.display = 'block';
                        (_a = this.lineParentTag) === null || _a === void 0 ? void 0 : _a.setAttribute('filter', 'url(#filterOutline)');
                    }
                    else {
                        this.arrowParentTag.style.filter = 'brightness(70%)';
                        this.arrowParentTag.children[this.arrowParentTag.children.length - 3].style.strokeWidth = '3';
                        this.arrowParentTag.children[this.arrowParentTag.children.length - 2].style.fill = 'black';
                        this.arrowParentTag.children[this.arrowParentTag.children.length - 1].style.fill = 'black';
                        for (var i = 0; i < this.arrowCount; i++) {
                            this.arrowParentTag.children[i * 2].style.strokeWidth = '8';
                            this.arrowParentTag.children[i * 2 + 1].style.strokeWidth = '3';
                        }
                    }
                }
                else {
                    if (this.groupType == GroupType.LINE) {
                        this.expandLeft.style.display = 'none';
                        this.expandRight.style.display = 'none';
                        (_b = this.lineParentTag) === null || _b === void 0 ? void 0 : _b.setAttribute('filter', '');
                    }
                    else {
                        this.arrowParentTag.style.filter = '';
                        this.arrowParentTag.children[this.arrowParentTag.children.length - 3].style.strokeWidth = '0';
                        this.arrowParentTag.children[this.arrowParentTag.children.length - 2].style.fill = 'transparent';
                        this.arrowParentTag.children[this.arrowParentTag.children.length - 1].style.fill = 'transparent';
                        for (var i = 0; i < this.arrowCount; i++) {
                            this.arrowParentTag.children[i * 2].style.strokeWidth = '5';
                            this.arrowParentTag.children[i * 2 + 1].style.strokeWidth = '0';
                        }
                    }
                }
            };
            LineGroup.prototype.SetColor = function (r, g, b) {
                this.rgb = { r: r, g: g, b: b };
                if (this.lineParentTag)
                    this.lineParentTag.setAttribute('style', 'stroke:' + this.MakeRGB(r, g, b, 1) + '; stroke-width:3;');
                if (this.labelParentTag)
                    this.labelParentTag.setAttribute('style', 'fill:' + this.MakeRGB(r, g, b, 0.6));
                if (this.arrowParentTag)
                    this.arrowParentTag.setAttribute('style', 'stroke:' + this.MakeRGB(r, g, b, 1) + '; fill:' + this.MakeRGB(r, g, b, 1));
            };
            LineGroup.prototype.MakeRGB = function (r, g, b, m) {
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
            return LineGroup;
        }());
        var NumberLine = (function () {
            function NumberLine() {
                this.DEFAULT_CELLSIZE = 60;
                this.dragMode = DragMode.NONE;
                this.xyBefore = { x: 0, y: 0 };
                this.xyNow = { x: 0, y: 0 };
                this.xyOrg = { x: 0, y: 0, r: 0 };
                this.lineGroups = [];
                this.LRButtonSize = 1;
                this.presetColors = [
                    231, 76, 60,
                    241, 196, 15,
                    39, 174, 96,
                    41, 128, 185,
                    52, 73, 94
                ];
            }
            NumberLine.prototype.MakeRGB = function (r, g, b, m) {
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
            NumberLine.prototype.HexToRGB = function (hex) {
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
            NumberLine.prototype.ChangeColor = function (item, colrstr) {
                var color = this.HexToRGB(colrstr);
                if (item.SetColor) {
                    item.SetColor(color.r, color.g, color.b);
                }
            };
            NumberLine.prototype.MakePaletteButton = function (imgsrc) {
                var bt = upred.ui.HTML.newNode('button');
                bt.className = 'paletteButtonClass';
                var img = new Image();
                img.src = imgsrc;
                img.width = 100;
                img.height = 100;
                img.style.display = 'inline-block';
                img.style.margin = '8px';
                img.style.touchAction = 'none';
                img.style.objectFit = 'contain';
                bt.appendChild(img);
                this.paletteTag.appendChild(bt);
                return bt;
            };
            NumberLine.prototype.MakeCommonFigure = function () {
                var w = this.DEFAULT_CELLSIZE * 0.7;
                var w2 = this.DEFAULT_CELLSIZE * 0.3;
                var h = 22;
                this.LRButtonSize = this.DEFAULT_CELLSIZE;
                var arrowLeft = new upred.ui.SVGSymbol('buttonExpandRight');
                arrowLeft.AddPath('M 0 0 L ' + w + ' 0 L ' + (w + w2) + ' ' + (h / 2) + ' L ' + w + ' ' + h + ' L 0 ' + h + ' Z', 'black', 'black', '1', 'butt', 'round');
                arrowLeft.SetSize('90', '40');
                var arrowRight = new upred.ui.SVGSymbol('buttonExpandLeft');
                arrowRight.AddPath('M 0 ' + (h / 2) + ' L ' + w2 + ' 0 L ' + (w + w2) + ' 0 L ' + (w + w2) + ' ' + h + ' L ' + w2 + ' ' + h + ' Z', 'black', 'black', '1', 'butt', 'round');
            };
            NumberLine.prototype.InitPalette = function () {
                this.svgCanvas = new upred.ui.SVGCanvas();
                this.paletteTag = document.getElementById('UI_PALETTE');
                this.MakeCommonFigure();
                var btMainline = this.MakePaletteButton('./asset/icon_itemline.png');
                btMainline.addEventListener('pointerdown', this.OnDragStartNewMainline.bind(this));
                var btArrowRight = this.MakePaletteButton('./asset/icon_arrowright.png');
                btArrowRight.addEventListener('pointerdown', this.OnDragStartNewArrowRight.bind(this));
                var btArrowRightRep = this.MakePaletteButton('./asset/icon_arrowright_repeat.png');
                btArrowRightRep.addEventListener('pointerdown', this.OnDragStartNewArrowRightRepeat.bind(this));
                var btArrowLeft = this.MakePaletteButton('./asset/icon_arrowleft.png');
                btArrowLeft.addEventListener('pointerdown', this.OnDragStartNewArrowLeft.bind(this));
                var btArrowLeftRep = this.MakePaletteButton('./asset/icon_arrowleft_repeat.png');
                btArrowLeftRep.addEventListener('pointerdown', this.OnDragStartNewArrowLeftRepeat.bind(this));
                window.addEventListener('pointermove', this.OnDragging.bind(this));
                window.addEventListener('pointerup', this.OnDragEnd.bind(this));
                this.svgCanvas.dragStarter.rect = this.OnDragStartMove.bind(this);
            };
            NumberLine.prototype.OnDragStartNewArrowRight = function (e) {
                var tgroup = new LineGroup(this.svgCanvas);
                tgroup.MakeArrowLine(0, this.DEFAULT_CELLSIZE, GroupType.ARROW_RIGHT, 1, 1);
                tgroup.SetColor(203, 67, 53);
                this.AddNewItem(e, tgroup, this.DEFAULT_CELLSIZE / 2, 80);
            };
            NumberLine.prototype.OnDragStartNewArrowRightRepeat = function (e) {
                var tgroup = new LineGroup(this.svgCanvas);
                tgroup.MakeArrowLineMulti(0, this.DEFAULT_CELLSIZE, GroupType.ARROW_RIGHT, 3);
                tgroup.SetColor(203, 67, 53);
                this.AddNewItem(e, tgroup, this.DEFAULT_CELLSIZE / 2, 80);
            };
            NumberLine.prototype.OnDragStartNewArrowLeft = function (e) {
                var tgroup = new LineGroup(this.svgCanvas);
                tgroup.MakeArrowLine(0, -this.DEFAULT_CELLSIZE, GroupType.ARROW_LEFT, 1, 1);
                tgroup.SetColor(46, 134, 193);
                this.AddNewItem(e, tgroup, this.DEFAULT_CELLSIZE / 2 + this.DEFAULT_CELLSIZE, 80);
            };
            NumberLine.prototype.OnDragStartNewArrowLeftRepeat = function (e) {
                var tgroup = new LineGroup(this.svgCanvas);
                tgroup.MakeArrowLineMulti(0, -this.DEFAULT_CELLSIZE, GroupType.ARROW_LEFT, 3);
                tgroup.SetColor(46, 134, 193);
                this.AddNewItem(e, tgroup, this.DEFAULT_CELLSIZE / 2, 80);
            };
            NumberLine.prototype.OnDragStartNewMainline = function (e) {
                var tgroup = new LineGroup(this.svgCanvas);
                tgroup.MakeLine(this.DEFAULT_CELLSIZE, 0, 10, 1, 1);
                tgroup.SetColor(0, 0, 0);
                this.AddNewItem(e, tgroup, 0, 0);
            };
            NumberLine.prototype.AddNewItem = function (e, tgroup, addX, addY) {
                var _a;
                if (!e.currentTarget)
                    return;
                var xy = e.currentTarget.getBoundingClientRect();
                this.xyOrg.x = xy.left + addX;
                this.xyOrg.y = xy.top + addY;
                this.xyNow.x = this.xyBefore.x = e.pageX;
                this.xyNow.y = this.xyBefore.y = e.pageY;
                e.preventDefault();
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:900;');
                this.AssignHandlersAndSave(tgroup, this.xyOrg.x, this.xyOrg.y);
                (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemOnlyOne(tgroup);
                this.dragMode = DragMode.NEW;
                this.curDraggingGroup = tgroup;
                this.curDraggingGroup.groupTag.style.opacity = '1';
                this.svgCanvas.GetTag().appendChild(this.curDraggingGroup.groupTag);
                this.dragMode = DragMode.NEW;
            };
            NumberLine.prototype.OnDragStartMove = function (e) {
                var _a, _b;
                var ttag = e.target;
                this.curDraggingGroup = undefined;
                if (!ttag) {
                    return;
                }
                var tgroup = null;
                for (var i = 0; i < this.lineGroups.length; i++) {
                    if (this.lineGroups[i].ContainsChild(ttag)) {
                        tgroup = this.lineGroups[i];
                        this.curDraggingGroup = this.lineGroups[i];
                        break;
                    }
                }
                if (tgroup == null) {
                    (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                    return false;
                }
                (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.SelectItemOnlyOne(tgroup);
                var p = this.svgCanvas.GetGroupPositionValue(tgroup.groupTag);
                this.svgCanvas.SetGroupFront(tgroup.groupTag);
                this.xyOrg.x = p.x;
                this.xyOrg.y = p.y;
                this.xyOrg.r = p.r;
                this.xyNow.x = this.xyBefore.x = e.pageX;
                this.xyNow.y = this.xyBefore.y = e.pageY;
                e.preventDefault();
                tgroup.groupTag.style.opacity = '0.9';
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:900;');
                if (tgroup.groupType == GroupType.LINE) {
                    for (var i = 0; i < tgroup.attachedArrowsBySP.length; i++) {
                        var OXY = this.svgCanvas.GetGroupPositionValue(tgroup.attachedArrowsBySP[i].groupTag);
                        tgroup.attachedArrowsBySPOldXY[i] = OXY;
                        this.svgCanvas.SetGroupFront(tgroup.attachedArrowsBySP[i].groupTag);
                    }
                    for (var i = 0; i < tgroup.attachedArrowsByEP.length; i++) {
                        var OXY = this.svgCanvas.GetGroupPositionValue(tgroup.attachedArrowsByEP[i].groupTag);
                        tgroup.attachedArrowsByEPOldXY[i] = OXY;
                        this.svgCanvas.SetGroupFront(tgroup.attachedArrowsByEP[i].groupTag);
                    }
                }
                this.dragMode = DragMode.MOVE;
                return true;
            };
            NumberLine.prototype.CheckSnap = function (e) {
                for (var i = 0; i < this.lineGroups.length; i++) {
                    if (this.lineGroups[i].groupType == GroupType.LINE) {
                        var line = this.lineGroups[i];
                        var xy = this.svgCanvas.GetGroupPositionValue(line.groupTag);
                        var sy = xy.y;
                        var ey = xy.y + line.SPLITTER_HEIGHT_HALF * 2 + line.LINE_THICKNESS + 40;
                        if (e.pageY >= sy - 10 && e.pageY <= ey) {
                            var cw = line.GetCellWidth();
                            for (var i_2 = 0; i_2 <= line.nCount; i_2++) {
                                var x = xy.x + i_2 * cw;
                                if (e.pageX >= x - 8 && e.pageX <= x + 8) {
                                    return { target: line, x: x, y: sy + line.SPLITTER_HEIGHT_HALF + line.LINE_THICKNESS / 2 };
                                }
                                if (line.nSubdivider > 1) {
                                    var subwidth = cw / line.nSubdivider;
                                    for (var j = 1; j < line.nSubdivider; j++) {
                                        var subx = x + subwidth * j;
                                        if (e.pageX >= subx - 8 && e.pageX <= subx + 8) {
                                            return { target: line, x: subx, y: sy + line.SPLITTER_HEIGHT_HALF + line.LINE_THICKNESS / 2 };
                                        }
                                    }
                                }
                            }
                            if (e.pageX >= xy.x && e.pageX <= xy.x + cw * line.nCount) {
                                return { target: line, x: e.pageX, y: sy + line.SPLITTER_HEIGHT_HALF + line.LINE_THICKNESS / 2 };
                            }
                        }
                    }
                }
                return null;
            };
            NumberLine.prototype.OnDragging = function (e) {
                if (this.dragMode == DragMode.MOVE || this.dragMode == DragMode.NEW) {
                    this.xyNow.x = e.pageX;
                    this.xyNow.y = e.pageY;
                    var dx = this.xyNow.x - this.xyBefore.x;
                    var dy = this.xyNow.y - this.xyBefore.y;
                    this.svgCanvas.SetGroupPositionValue(this.curDraggingGroup.groupTag, this.xyOrg.x + dx, this.xyOrg.y + dy);
                    var pPos = this.paletteTag.getBoundingClientRect();
                    if (e.pageX < pPos.right && e.pageY > pPos.top) {
                        this.curDraggingGroup.groupTag.style.opacity = '0.5';
                    }
                    else {
                        this.curDraggingGroup.groupTag.style.opacity = '1';
                    }
                    if (this.curDraggingGroup.groupType == GroupType.LINE) {
                        for (var i = 0; i < this.curDraggingGroup.attachedArrowsBySP.length; i++) {
                            this.svgCanvas.SetGroupPositionValue(this.curDraggingGroup.attachedArrowsBySP[i].groupTag, this.curDraggingGroup.attachedArrowsBySPOldXY[i].x + dx, this.curDraggingGroup.attachedArrowsBySPOldXY[i].y + dy);
                        }
                        for (var i = 0; i < this.curDraggingGroup.attachedArrowsByEP.length; i++) {
                            this.svgCanvas.SetGroupPositionValue(this.curDraggingGroup.attachedArrowsByEP[i].groupTag, this.curDraggingGroup.attachedArrowsByEPOldXY[i].x + dx, this.curDraggingGroup.attachedArrowsByEPOldXY[i].y + dy);
                        }
                    }
                    else if (this.curDraggingGroup.groupType == GroupType.ARROW_LEFT || this.curDraggingGroup.groupType == GroupType.ARROW_RIGHT) {
                        var spx = parseFloat(this.curDraggingGroup.arrowParentTag.children[this.curDraggingGroup.arrowParentTag.children.length - 3].getAttribute('cx'));
                        var snapSP = this.CheckSnap({ pageX: this.xyOrg.x + dx + spx, pageY: this.xyOrg.y + dy });
                        if (snapSP) {
                            this.svgCanvas.SetGroupPositionValue(this.curDraggingGroup.groupTag, snapSP.x - spx, snapSP.y);
                            this.curDraggingGroup.attachedLineBySP = snapSP.target;
                            if (snapSP.target.attachedArrowsBySP.indexOf(this.curDraggingGroup) < 0) {
                                snapSP.target.attachedArrowsBySP.push(this.curDraggingGroup);
                            }
                        }
                        else {
                            if (this.curDraggingGroup.attachedLineBySP) {
                                var delindex = this.curDraggingGroup.attachedLineBySP.attachedArrowsBySP.indexOf(this.curDraggingGroup);
                                if (delindex >= 0)
                                    this.curDraggingGroup.attachedLineBySP.attachedArrowsBySP.splice(delindex, 1);
                                this.curDraggingGroup.attachedLineBySP = undefined;
                            }
                            if (this.curDraggingGroup.attachedLineByEP) {
                                var delindex = this.curDraggingGroup.attachedLineByEP.attachedArrowsByEP.indexOf(this.curDraggingGroup);
                                if (delindex >= 0)
                                    this.curDraggingGroup.attachedLineByEP.attachedArrowsByEP.splice(delindex, 1);
                                this.curDraggingGroup.attachedLineByEP = undefined;
                            }
                        }
                    }
                }
                else if (this.curDraggingGroup) {
                    this.xyNow.x = e.pageX;
                    this.xyNow.y = e.pageY;
                    var dx = this.xyNow.x - this.xyBefore.x;
                    var dy = this.xyNow.y - this.xyBefore.y;
                    switch (this.dragMode) {
                        case DragMode.STRETCH_RIGHT:
                            {
                                var count = Math.floor(dx / this.curDraggingGroup.GetCellWidth());
                                this.curDraggingGroup.ChangeLine(this.curDraggingGroup.nCellWidth, this.curDraggingGroup.preStart, this.curDraggingGroup.preCount + count, this.curDraggingGroup.nAdd, this.curDraggingGroup.nSubdivider);
                            }
                            break;
                        case DragMode.STRETCH_LEFT:
                            {
                                var count = Math.floor(dx / this.curDraggingGroup.GetCellWidth());
                                this.curDraggingGroup.ChangeLine(this.curDraggingGroup.nCellWidth, this.curDraggingGroup.preStart + count, this.curDraggingGroup.preCount - count, this.curDraggingGroup.nAdd, this.curDraggingGroup.nSubdivider);
                                this.svgCanvas.SetGroupPositionValue(this.curDraggingGroup.groupTag, this.xyOrg.x + (count * this.curDraggingGroup.GetCellWidth()), this.xyOrg.y);
                            }
                            break;
                        case DragMode.ARROW_SP:
                            {
                                var snap = this.CheckSnap(e);
                                if (snap) {
                                    var gxy = this.svgCanvas.GetGroupPositionValue(this.curDraggingGroup.groupTag);
                                    this.curDraggingGroup.ResizeArrowLine(snap.x - gxy.x, this.curDraggingGroup.arrowPosition.preEp);
                                    this.svgCanvas.SetGroupPositionValue(this.curDraggingGroup.groupTag, this.xyOrg.x, snap.y);
                                    this.curDraggingGroup.attachedLineBySP = snap.target;
                                    if (snap.target.attachedArrowsBySP.indexOf(this.curDraggingGroup) < 0) {
                                        snap.target.attachedArrowsBySP.push(this.curDraggingGroup);
                                    }
                                }
                                else {
                                    var nx = this.curDraggingGroup.arrowPosition.preSp + dx;
                                    this.curDraggingGroup.ResizeArrowLine(nx, this.curDraggingGroup.arrowPosition.preEp);
                                    this.svgCanvas.SetGroupPositionValue(this.curDraggingGroup.groupTag, this.xyOrg.x, this.xyOrg.y + dy);
                                    if (this.curDraggingGroup.attachedLineBySP) {
                                        var delindex = this.curDraggingGroup.attachedLineBySP.attachedArrowsBySP.indexOf(this.curDraggingGroup);
                                        if (delindex >= 0)
                                            this.curDraggingGroup.attachedLineBySP.attachedArrowsBySP.splice(delindex, 1);
                                        this.curDraggingGroup.attachedLineBySP = undefined;
                                    }
                                }
                            }
                            break;
                        case DragMode.ARROW_EP:
                            {
                                var snap = this.CheckSnap(e);
                                if (snap) {
                                    var gxy = this.svgCanvas.GetGroupPositionValue(this.curDraggingGroup.groupTag);
                                    this.curDraggingGroup.ResizeArrowLine(this.curDraggingGroup.arrowPosition.preSp, snap.x - gxy.x);
                                    this.svgCanvas.SetGroupPositionValue(this.curDraggingGroup.groupTag, this.xyOrg.x, snap.y);
                                    this.curDraggingGroup.attachedLineByEP = snap.target;
                                    if (snap.target.attachedArrowsByEP.indexOf(this.curDraggingGroup) < 0) {
                                        snap.target.attachedArrowsByEP.push(this.curDraggingGroup);
                                    }
                                }
                                else {
                                    var nx = this.curDraggingGroup.arrowPosition.preEp + dx;
                                    this.curDraggingGroup.ResizeArrowLine(this.curDraggingGroup.arrowPosition.preSp, nx);
                                    this.svgCanvas.SetGroupPositionValue(this.curDraggingGroup.groupTag, this.xyOrg.x, this.xyOrg.y + dy);
                                    if (this.curDraggingGroup.attachedLineByEP) {
                                        var delindex = this.curDraggingGroup.attachedLineByEP.attachedArrowsByEP.indexOf(this.curDraggingGroup);
                                        if (delindex >= 0)
                                            this.curDraggingGroup.attachedLineByEP.attachedArrowsByEP.splice(delindex, 1);
                                        this.curDraggingGroup.attachedLineByEP = undefined;
                                    }
                                }
                            }
                            break;
                        case DragMode.ARROW_MP:
                            {
                                var uw = this.curDraggingGroup.arrowPosition.preEp - this.curDraggingGroup.arrowPosition.preSp;
                                var diff = Math.round(dx / uw);
                                this.curDraggingGroup.ChangeArrowCount(this.curDraggingGroup.preArrowCount + diff);
                            }
                            break;
                    }
                }
            };
            NumberLine.prototype.OnDragEnd = function (e) {
                var _a, _b;
                if (this.dragMode == DragMode.MOVE || this.dragMode == DragMode.NEW) {
                    var dx = this.xyNow.x - this.xyBefore.x;
                    var dy = this.xyNow.y - this.xyBefore.y;
                    if (this.curDraggingGroup != null) {
                        this.curDraggingGroup.groupTag.style.opacity = '1';
                        var pos = this.curDraggingGroup.groupTag.getBoundingClientRect();
                        var pPos = this.paletteTag.getBoundingClientRect();
                        if (e.pageX < pPos.right && e.pageY > pPos.top) {
                            this.svgCanvas.RemoveGroup(this.curDraggingGroup.groupTag);
                            this.lineGroups.splice(this.lineGroups.indexOf(this.curDraggingGroup), 1);
                        }
                        else {
                            (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                            if (dx * dx + dy * dy < 32) {
                                (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.SelectItemOnlyOne(this.curDraggingGroup);
                            }
                        }
                    }
                    this.curDraggingGroup = undefined;
                    this.dragMode = 0;
                    this.EnableInteraction();
                    e.preventDefault();
                }
                else {
                    if (this.dragMode != 0) {
                        if (this.dragMode == DragMode.ARROW_EP) {
                            this.curDraggingGroup.arrowParentTag.children[this.curDraggingGroup.arrowParentTag.children.length - 2].style.fill = 'transparent';
                        }
                        else if (this.dragMode == DragMode.ARROW_SP) {
                            this.curDraggingGroup.arrowParentTag.children[this.curDraggingGroup.arrowParentTag.children.length - 3].style.fill = '';
                        }
                        else if (this.dragMode == DragMode.ARROW_MP) {
                            this.curDraggingGroup.arrowParentTag.children[this.curDraggingGroup.arrowParentTag.children.length - 1].style.fill = 'transparent';
                        }
                        this.curDraggingGroup = undefined;
                        this.dragMode = 0;
                        this.EnableInteraction();
                        e.preventDefault();
                    }
                }
            };
            NumberLine.prototype.RemoveByGroupTag = function (grouptag) {
                var n = -1;
                for (var i = 0; i < this.lineGroups.length; i++) {
                    if (this.lineGroups[i].groupTag == grouptag) {
                        n = i;
                        break;
                    }
                }
                if (n >= 0)
                    this.lineGroups.splice(n, 1);
            };
            NumberLine.prototype.AssignHandlersAndSave = function (group, x, y) {
                group.highlighter = this.ShowHighlighted.bind(this);
                group.deleteHandler = this.Delete.bind(this);
                group.duplicateHandler = this.Duplicate.bind(this);
                group.rotateHandler = this.Rotate.bind(this);
                group.colorChanger = this.ChangeColor.bind(this);
                this.svgCanvas.SetGroupPositionValue(group.groupTag, x, y);
                this.lineGroups.push(group);
            };
            NumberLine.prototype.ShowHighlighted = function (group, flag) {
                if (group) {
                    group.Highlight(flag);
                }
            };
            NumberLine.prototype.SetSelectionBy = function (x, y, w, h) {
                var _a;
                for (var i = 0; i < this.lineGroups.length; i++) {
                    var ar = this.lineGroups[i].groupTag.getBoundingClientRect();
                    if (!(x > ar.right ||
                        x + w < ar.left ||
                        y > ar.bottom ||
                        y + h < ar.top)) {
                        (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemAdd(this.lineGroups[i]);
                    }
                }
            };
            NumberLine.prototype.Rotate = function (group, degree) {
                var targetRoot = group.groupTag;
                if (targetRoot != null) {
                    var xyr = this.svgCanvas.GetGroupPositionValue(targetRoot);
                    this.svgCanvas.SetGroupRotationValue(targetRoot, xyr.r + degree);
                }
            };
            NumberLine.prototype.Delete = function (targetGroup) {
                if (targetGroup != null && this.lineGroups.indexOf(targetGroup) >= 0) {
                    if (targetGroup.groupType == GroupType.LINE) {
                        for (var i = 0; i < targetGroup.attachedArrowsBySP.length; i++) {
                            targetGroup.attachedArrowsBySP[i].attachedLineBySP = undefined;
                        }
                        targetGroup.attachedArrowsBySP = [];
                        for (var i = 0; i < targetGroup.attachedArrowsByEP.length; i++) {
                            targetGroup.attachedArrowsByEP[i].attachedLineByEP = undefined;
                        }
                        targetGroup.attachedArrowsByEP = [];
                    }
                    else if (targetGroup.groupType == GroupType.ARROW_LEFT || targetGroup.groupType == GroupType.ARROW_RIGHT) {
                        if (targetGroup.attachedLineBySP) {
                            var delindex = targetGroup.attachedLineBySP.attachedArrowsBySP.indexOf(targetGroup);
                            if (delindex >= 0)
                                targetGroup.attachedLineBySP.attachedArrowsBySP.splice(delindex, 1);
                            targetGroup.attachedLineBySP = undefined;
                        }
                        if (targetGroup.attachedLineByEP) {
                            var delindex = targetGroup.attachedLineByEP.attachedArrowsByEP.indexOf(targetGroup);
                            if (delindex >= 0)
                                targetGroup.attachedLineByEP.attachedArrowsByEP.splice(delindex, 1);
                            targetGroup.attachedLineByEP = undefined;
                        }
                    }
                    this.svgCanvas.RemoveGroup(targetGroup.groupTag);
                    this.lineGroups.splice(this.lineGroups.indexOf(targetGroup), 1);
                }
            };
            NumberLine.prototype.Duplicate = function (targetGroup) {
                var _a, _b;
                if (targetGroup != null) {
                    var xy = this.svgCanvas.GetGroupPositionValue(targetGroup.groupTag);
                    var groupB = targetGroup.Duplicate();
                    this.AssignHandlersAndSave(groupB, xy.x, xy.y);
                    this.svgCanvas.SetGroupPositionValue(groupB.groupTag, xy.x + 20, xy.y + 20);
                    if (targetGroup.groupType == GroupType.LINE) {
                        for (var i = 0; i < targetGroup.attachedArrowsBySP.length; i++) {
                            var arrow = targetGroup.attachedArrowsBySP[i];
                            var arrowCopy = arrow.Duplicate();
                            var oldXY = this.svgCanvas.GetGroupPositionValue(arrow.groupTag);
                            this.AssignHandlersAndSave(arrowCopy, oldXY.x, oldXY.y);
                            this.svgCanvas.SetGroupPositionValue(arrowCopy.groupTag, oldXY.x + 20, oldXY.y + 20);
                            groupB.attachedArrowsBySP.push(arrowCopy);
                            arrowCopy.attachedLineBySP = groupB;
                        }
                        for (var i = 0; i < targetGroup.attachedArrowsByEP.length; i++) {
                            var arrow = targetGroup.attachedArrowsByEP[i];
                            var arrowCopy = arrow.Duplicate();
                            var oldXY = this.svgCanvas.GetGroupPositionValue(arrow.groupTag);
                            this.AssignHandlersAndSave(arrowCopy, oldXY.x, oldXY.y);
                            this.svgCanvas.SetGroupPositionValue(arrowCopy.groupTag, oldXY.x + 20, oldXY.y + 20);
                            groupB.attachedArrowsByEP.push(arrowCopy);
                            arrowCopy.attachedLineByEP = groupB;
                        }
                    }
                    (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemAdd(targetGroup);
                    (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.duplicated.push(groupB);
                }
            };
            NumberLine.prototype.RestoreInitialState = function () {
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:400;');
                for (var i = 0; i < this.lineGroups.length; i++) {
                    this.svgCanvas.RemoveGroup(this.lineGroups[i].groupTag);
                }
                this.lineGroups = [];
            };
            NumberLine.prototype.EnableInteraction = function () {
                this.svgCanvas.MoveToFront();
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:750;');
            };
            NumberLine.prototype.DisableInteraction = function () {
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:400;');
            };
            NumberLine.prototype.OnClickNarrow = function () {
                for (var i = 0; i < upred.ui.uiModule.selectedItems.length; i++) {
                    if (upred.ui.uiModule.selectedItems[i].groupType == GroupType.LINE) {
                        var line = upred.ui.uiModule.selectedItems[i];
                        line.ZoomOut();
                    }
                }
            };
            NumberLine.prototype.OnClickWide = function () {
                for (var i = 0; i < upred.ui.uiModule.selectedItems.length; i++) {
                    if (upred.ui.uiModule.selectedItems[i].groupType == GroupType.LINE) {
                        var line = upred.ui.uiModule.selectedItems[i];
                        line.ZoomIn();
                    }
                }
            };
            NumberLine.prototype.IsLineGroup = function () {
                var found = false;
                for (var i = 0; i < upred.ui.uiModule.selectedItems.length; i++) {
                    if (upred.ui.uiModule.selectedItems[i].groupType == GroupType.LINE) {
                        return true;
                    }
                }
                return false;
            };
            NumberLine.prototype.OnClickSettings = function () {
                if (upred.ui.uiModule.selectedItems.length <= 0)
                    return;
                var group = upred.ui.uiModule.selectedItems[0];
                document.getElementById('LINECUSTOM_START').value = group.nStart.toString();
                document.getElementById('LINECUSTOM_ADD').value = group.nAdd.toString();
                document.getElementById('LINECUSTOM_SUBDIV').value = group.nSubdivider.toString();
                document.getElementById('CUSTOM_MAKE_DLG').style.display = 'block';
            };
            NumberLine.prototype.OnClickCustomOK = function () {
                var sn = document.getElementById('LINECUSTOM_START').value;
                var addn = document.getElementById('LINECUSTOM_ADD').value;
                var subn = document.getElementById('LINECUSTOM_SUBDIV').value;
                for (var i = 0; i < upred.ui.uiModule.selectedItems.length; i++) {
                    if (upred.ui.uiModule.selectedItems[i].groupType == GroupType.LINE) {
                        var line = upred.ui.uiModule.selectedItems[i];
                        line.ChangeLine(line.nCellWidth, parseFloat(sn), line.nCount, parseFloat(addn), parseInt(subn));
                    }
                }
                document.getElementById('CUSTOM_MAKE_DLG').style.display = 'none';
            };
            NumberLine.prototype.OnClickCustomCancel = function () {
                document.getElementById('CUSTOM_MAKE_DLG').style.display = 'none';
            };
            NumberLine.prototype.InitCustomDlg = function () {
                document.getElementById('LINECUSTOM_OK').onclick = this.OnClickCustomOK.bind(this);
                document.getElementById('LINECUSTOM_CANCEL').onclick = this.OnClickCustomCancel.bind(this);
            };
            NumberLine.prototype.Init = function () {
                var _a, _b, _c, _d;
                this.InitCustomDlg();
                (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.AddCustomModifier('settings', {
                    img: './asset/icon_settings.png',
                    txt: '설정',
                    handler: this.OnClickSettings.bind(this),
                    checkHandler: this.IsLineGroup.bind(this)
                });
                (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.AddCustomModifier('narrow', {
                    img: './asset/icon_narrow.png',
                    txt: '좁히기',
                    handler: this.OnClickNarrow.bind(this),
                    checkHandler: this.IsLineGroup.bind(this)
                });
                (_c = upred.ui.uiModule) === null || _c === void 0 ? void 0 : _c.AddCustomModifier('wide', {
                    img: './asset/icon_wide.png',
                    txt: '넓히기',
                    handler: this.OnClickWide.bind(this),
                    checkHandler: this.IsLineGroup.bind(this)
                });
                (_d = upred.ui.uiModule) === null || _d === void 0 ? void 0 : _d.DisableRotation();
                this.InitPalette();
                upred.ui.GuideViewer.Show('./asset/guide.png');
            };
            return NumberLine;
        }());
        math.NumberLine = NumberLine;
    })(math = upred.math || (upred.math = {}));
})(upred || (upred = {}));
//# sourceMappingURL=numberline.js.map