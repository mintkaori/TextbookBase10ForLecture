"use strict";
var upred;
(function (upred) {
    var math;
    (function (math) {
        var SideType;
        (function (SideType) {
            SideType[SideType["LEFT"] = 0] = "LEFT";
            SideType[SideType["RIGHT"] = 1] = "RIGHT";
            SideType[SideType["BOTTOM"] = 2] = "BOTTOM";
            SideType[SideType["NONE"] = 3] = "NONE";
        })(SideType = math.SideType || (math.SideType = {}));
    })(math = upred.math || (upred.math = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var math;
    (function (math) {
        var LinkInfo = (function () {
            function LinkInfo(meTag) {
                this.me = meTag;
                meTag.LINK_INFO = this;
            }
            return LinkInfo;
        }());
        math.LinkInfo = LinkInfo;
    })(math = upred.math || (upred.math = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var math;
    (function (math) {
        var HoleInfo = (function () {
            function HoleInfo(pNode, sideType, xpos, ypos) {
                this.x = xpos;
                this.y = ypos;
                this.side = sideType;
                this.parent = pNode;
            }
            return HoleInfo;
        }());
        math.HoleInfo = HoleInfo;
    })(math = upred.math || (upred.math = {}));
})(upred || (upred = {}));
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
        var CubeLinks = (function () {
            function CubeLinks() {
                this.CUBESIZE = 61;
                this.CUBEHEIGHT = 0;
                this.CUBECAPHEIGHT = 0;
                this.VARROWHEIGHT = 0;
                this.dragMode = 0;
                this.xyBefore = { x: 0, y: 0 };
                this.xyNow = { x: 0, y: 0 };
                this.xyOrg = { x: 0, y: 0, r: 0 };
                this.allGroups = [];
            }
            CubeLinks.prototype.MakeRGB = function (r, g, b, m) {
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
            CubeLinks.prototype.MakeCube = function (ids, wh, r, g, b) {
                var cube = new upred.ui.SVGSymbol(ids);
                var fillA = cube.AddLinearGradient('0%', '50%', '100%', '50%', [
                    '0%',
                    this.MakeRGB(r, g, b, 0.85),
                    '1',
                    '50%',
                    this.MakeRGB(r, g, b, 1.1),
                    '1',
                    '100%',
                    this.MakeRGB(r, g, b, 0.85),
                    '1',
                ]);
                var fillB = cube.AddLinearGradient('50%', '0%', '50%', '100%', [
                    '30%',
                    this.MakeRGB(r, g, b, 1),
                    '1',
                    '80%',
                    this.MakeRGB(r, g, b, 0.85),
                    '1',
                ]);
                var fillC = cube.AddLinearGradient('50%', '0%', '50%', '100%', [
                    '0%',
                    this.MakeRGB(r, g, b, 0.95),
                    '1',
                    '100%',
                    this.MakeRGB(r, g, b, 0.65),
                    '1',
                ]);
                var halfW = Math.floor(wh / 2);
                this.CUBECAPHEIGHT = Math.floor(halfW * 0.4);
                var capHalfW = Math.floor(wh * 0.2);
                this.CUBEHEIGHT = halfW * 2;
                cube.AddRectangle(-capHalfW, -(halfW + this.CUBECAPHEIGHT), capHalfW * 2, this.CUBECAPHEIGHT, 'url(#' + fillA + ')', this.MakeRGB(r, g, b, 1), 1);
                cube.AddRectangle(-halfW, -halfW, this.CUBEHEIGHT, this.CUBEHEIGHT, 'url(#' + fillB + ')', this.MakeRGB(r, g, b, 1.2), 1);
                cube.AddCircle(0, 0, capHalfW, 'url(#' + fillC + ')', this.MakeRGB(r, g, b, 1), 2);
                cube.SetSize(this.CUBEHEIGHT.toString(), (this.CUBEHEIGHT + this.CUBECAPHEIGHT).toString());
                cube.symbolTag.style.overflow = 'visible';
                return cube;
            };
            CubeLinks.prototype.MakeShadowCube = function (ids, wh, fill) {
                var cube = new upred.ui.SVGSymbol(ids);
                var halfW = Math.floor(wh / 2);
                this.CUBECAPHEIGHT = Math.floor(halfW * 0.4);
                var capHalfW = Math.floor(wh * 0.2);
                this.CUBEHEIGHT = halfW * 2;
                cube.AddRectangle(-capHalfW, -(halfW + this.CUBECAPHEIGHT), capHalfW * 2, this.CUBECAPHEIGHT + 1, fill);
                cube.AddRectangle(-halfW, -halfW, this.CUBEHEIGHT, this.CUBEHEIGHT, fill);
                cube.AddCircle(0, 0, capHalfW, fill);
                cube.SetSize(this.CUBEHEIGHT.toString(), (this.CUBEHEIGHT + this.CUBECAPHEIGHT).toString());
                cube.symbolTag.style.overflow = 'visible';
                return cube;
            };
            CubeLinks.prototype.MakeVArrow = function (ids) {
                var varrow = new upred.ui.SVGSymbol(ids);
                var aWidth = Math.floor(this.CUBESIZE * 0.5 / 2);
                var aHeight = Math.floor(this.CUBESIZE * 0.45 / 2);
                var lThick = Math.floor(this.CUBESIZE * 0.2 / 2);
                var lHeight = Math.floor(this.CUBESIZE * 0.2 / 2);
                varrow.AddPolygon([
                    -aWidth, -lHeight,
                    0, -aHeight,
                    aWidth, -lHeight,
                    lThick, -lHeight,
                    lThick, lHeight,
                    aWidth, lHeight,
                    0, aHeight,
                    -aWidth, lHeight,
                    -lThick, lHeight,
                    -lThick, -lHeight,
                    -aWidth, -lHeight
                ], '#FFFFFF', '#343434', 1);
                this.VARROWHEIGHT = aHeight * 2;
                varrow.SetSize((aWidth * 2).toString(), this.VARROWHEIGHT.toString());
                varrow.symbolTag.style.overflow = 'visible';
                return varrow;
            };
            CubeLinks.prototype.ChangeItemColor = function (item, r, g, b) {
            };
            CubeLinks.prototype.InitPalette = function () {
                this.cubeCanvas = new upred.ui.SVGCanvas();
                this.paletteTag = document.getElementById('UI_PALETTE');
                var cubeColors = [
                    232, 52, 33,
                    240, 130, 0,
                    255, 225, 0,
                    195, 215, 43,
                    26, 171, 71,
                    48, 129, 196,
                    169, 81, 155,
                    236, 240, 241,
                    26, 28, 28,
                    104, 60, 38
                ];
                var cn = 0;
                if (upred.ui.ScreenUtil.GetScreenHeight() < 480) {
                    this.CUBESIZE = Math.floor((upred.ui.ScreenUtil.GetScreenHeight() - 80) / 8);
                }
                for (var i = 0; i < cubeColors.length; i += 3) {
                    this.MakeCube('LinkableCube' + cn, this.CUBESIZE, cubeColors[i], cubeColors[i + 1], cubeColors[i + 2]);
                    cn++;
                }
                this.MakeShadowCube('ShadowCube', this.CUBESIZE, 'rgba(110,110,110,1)');
                this.MakeVArrow('splitArrow');
                for (var i = 0; i < cn; i++) {
                    var cube = new upred.ui.SVGUnit();
                    cube.AddSymbol('LinkableCube' + i);
                    cube.subTag[0].setAttribute('x', (this.CUBESIZE / 2).toString());
                    cube.subTag[0].setAttribute('y', (this.CUBESIZE / 2 + this.CUBECAPHEIGHT).toString());
                    cube.GetTag().style.display = 'inline-block';
                    if (this.CUBESIZE < 61)
                        cube.GetTag().style.margin = '3px';
                    else
                        cube.GetTag().style.margin = '4px 8px';
                    cube.GetTag().style.touchAction = 'none';
                    this.paletteTag.appendChild(cube.GetTag());
                    cube.GetTag().addEventListener('pointerdown', this.OnDragStartNew.bind(this));
                }
                window.addEventListener('pointermove', this.OnDragging.bind(this));
                window.addEventListener('pointerup', this.OnDragEnd.bind(this));
                this.cubeCanvas.dragStarter.use = this.OnDragStartMove.bind(this);
            };
            CubeLinks.prototype.OnDragStartNew = function (e) {
                var _a;
                if (!e.currentTarget)
                    return;
                var originalCube = e.currentTarget;
                var xy = originalCube.getBoundingClientRect();
                this.xyOrg.x = xy.left + this.CUBESIZE / 2;
                this.xyOrg.y = xy.top + this.CUBESIZE / 2 + this.CUBECAPHEIGHT;
                this.xyBefore.x = e.pageX;
                this.xyBefore.y = e.pageY;
                e.preventDefault();
                this.dragMode = 1;
                this.cubeCanvas
                    .GetTag()
                    .setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:900;');
                var clone = originalCube.cloneNode(true).firstChild;
                this.cubeCanvas.GetTag().appendChild(clone);
                clone.style.opacity = '1';
                var li = new math.LinkInfo(clone);
                var tgroup = this.MakeNewGroup(this.xyOrg.x, this.xyOrg.y, li);
                (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemOnlyOne(tgroup);
                this.dragMode = 2;
                this.curDraggingGroup = tgroup;
                this.curDraggingGroup.UpdateHoleInfo(0);
            };
            CubeLinks.prototype.OnDragStartMove = function (e) {
                var _a, _b;
                var usetag = e.target;
                if (!usetag)
                    return;
                if (usetag.getAttribute('href') == '#splitArrow')
                    return false;
                this.curDraggingGroup = undefined;
                var tgroup = null;
                for (var i = 0; i < this.allGroups.length; i++) {
                    if (this.allGroups[i].groupTag.contains(usetag)) {
                        tgroup = this.allGroups[i];
                        this.curDraggingGroup = this.allGroups[i];
                        break;
                    }
                }
                if (this.curDraggingGroup == null) {
                    (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                    return false;
                }
                var BXY = this.cubeCanvas.GetGroupPositionValue(this.curDraggingGroup.groupTag);
                this.curDraggingGroup.UpdateHoleInfo(BXY.r);
                (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.SelectItemOnlyOne(tgroup);
                var p = this.cubeCanvas.GetGroupPositionValue(this.curDraggingGroup.groupTag);
                this.cubeCanvas.SetGroupFront(this.curDraggingGroup.groupTag);
                this.xyOrg.x = p.x;
                this.xyOrg.y = p.y;
                this.xyOrg.r = p.r;
                this.xyNow.x = this.xyBefore.x = e.pageX;
                this.xyNow.y = this.xyBefore.y = e.pageY;
                e.preventDefault();
                this.curDraggingGroup.groupTag.style.opacity = '0.9';
                this.cubeCanvas
                    .GetTag()
                    .setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:900;');
                this.dragMode = 2;
                return true;
            };
            CubeLinks.prototype.OnDragging = function (e) {
                if (this.dragMode == 1 || this.dragMode == 2) {
                    this.xyNow.x = e.pageX;
                    this.xyNow.y = e.pageY;
                    var dx = this.xyNow.x - this.xyBefore.x;
                    var dy = this.xyNow.y - this.xyBefore.y;
                    if (this.dragMode == 2) {
                        this.cubeCanvas.SetGroupPositionValue(this.curDraggingGroup.groupTag, this.xyOrg.x + dx, this.xyOrg.y + dy);
                        var pos = this.curDraggingGroup.groupTag.getBoundingClientRect();
                        var pPos = this.paletteTag.getBoundingClientRect();
                        if (pos.right < pPos.right && pos.top > pPos.top) {
                            this.curDraggingGroup.groupTag.style.opacity = '0.5';
                        }
                        else {
                            this.curDraggingGroup.groupTag.style.opacity = '1';
                        }
                        this.CheckShowAttachment(true);
                    }
                }
            };
            CubeLinks.prototype.OnDragEnd = function (e) {
                var _a, _b;
                if (this.dragMode != 0) {
                    var dx = this.xyNow.x - this.xyBefore.x;
                    var dy = this.xyNow.y - this.xyBefore.y;
                    if (this.curDraggingGroup != null &&
                        !this.CheckShowAttachment(false) &&
                        this.dragMode == 2) {
                        this.curDraggingGroup.groupTag.style.opacity = '1';
                        if (dx * dx + dy * dy < 32) {
                            (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemOnlyOne(this.curDraggingGroup);
                            this.curDraggingGroup.ShowSplitArrow(true);
                        }
                        else {
                            var pPos = this.paletteTag.getBoundingClientRect();
                            if (e.pageX < pPos.right && e.pageY > pPos.top) {
                                this.cubeCanvas.RemoveGroup(this.curDraggingGroup.groupTag);
                                this.allGroups.splice(this.allGroups.indexOf(this.curDraggingGroup), 1);
                            }
                            (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.UnselectAll();
                        }
                    }
                    this.curDraggingGroup = undefined;
                    this.dragMode = 0;
                    this.EnableInteraction();
                    e.stopPropagation();
                    e.preventDefault();
                }
            };
            CubeLinks.prototype.CheckShowAttachment = function (isPreview) {
                if (!this.curDraggingGroup)
                    return;
                var BXY = this.cubeCanvas.GetGroupPositionValue(this.curDraggingGroup.groupTag);
                var attachable = false;
                if (!isPreview)
                    this.curDraggingGroup.ShowSplitArrow(false);
                for (var i = 0; i < this.allGroups.length; i++) {
                    if (this.allGroups[i] == this.curDraggingGroup)
                        continue;
                    var AXY = this.cubeCanvas.GetGroupPositionValue(this.allGroups[i].groupTag);
                    attachable = this.allGroups[i].CheckAttachable(BXY.x - AXY.x, BXY.y - AXY.y, this.allGroups[i].headCube, AXY.r, 0, 0);
                    if (isPreview) {
                        this.allGroups[i].ShowAttachmentPreview(attachable);
                    }
                    else if (attachable) {
                        if (this.allGroups[i].AttachCubes(this.curDraggingGroup)) {
                            var idx = this.allGroups.indexOf(this.curDraggingGroup);
                            if (idx >= 0)
                                this.allGroups.splice(idx, 1);
                            this.cubeCanvas.RemoveGroup(this.curDraggingGroup.groupTag);
                        }
                        return true;
                    }
                }
                var cntf = false;
                var half = upred.ui.mathModule.CUBEHEIGHT / 2;
                var distM = half * half;
                if (!attachable) {
                    for (var i = 0; i < this.curDraggingGroup.holes.length; i++) {
                        var holeX = this.curDraggingGroup.holes[i].x + BXY.x;
                        var holeY = this.curDraggingGroup.holes[i].y + BXY.y;
                        for (var j = 0; j < this.allGroups.length; j++) {
                            if (this.allGroups[j] == this.curDraggingGroup)
                                continue;
                            var AXY = this.cubeCanvas.GetGroupPositionValue(this.allGroups[j].groupTag);
                            var dist = (AXY.x - holeX) * (AXY.x - holeX) + (AXY.y - holeY) * (AXY.y - holeY);
                            if (dist < distM) {
                                if (isPreview) {
                                    this.curDraggingGroup.ResetMarkerInfo(this.curDraggingGroup.holes[i].parent);
                                    switch (this.curDraggingGroup.holes[i].side) {
                                        case math.SideType.BOTTOM:
                                            this.curDraggingGroup.holes[i].parent.bottomChild = this.curDraggingGroup.markerInfo;
                                            break;
                                        case math.SideType.LEFT:
                                            this.curDraggingGroup.holes[i].parent.leftChild = this.curDraggingGroup.markerInfo;
                                            break;
                                        case math.SideType.RIGHT:
                                            this.curDraggingGroup.holes[i].parent.rightChild = this.curDraggingGroup.markerInfo;
                                            break;
                                    }
                                    this.curDraggingGroup.ShowAttachmentPreview(true);
                                    cntf = true;
                                }
                                else {
                                    if (this.curDraggingGroup.AttachCubes(this.allGroups[j])) {
                                        this.cubeCanvas.RemoveGroup(this.allGroups[j].groupTag);
                                        this.allGroups.splice(j, 1);
                                    }
                                    return true;
                                }
                            }
                        }
                    }
                    if (!cntf) {
                        this.curDraggingGroup.ShowAttachmentPreview(false);
                    }
                }
                else {
                    this.curDraggingGroup.ShowAttachmentPreview(false);
                }
                return false;
            };
            CubeLinks.prototype.IsCubeTag = function (tag) {
                if (tag && tag.tagName) {
                    if (tag.tagName.toUpperCase() == 'USE') {
                        var ref = tag.getAttribute('href');
                        if (ref != '#splitArrow' &&
                            ref != '#splitArrow2')
                            return true;
                    }
                }
                return false;
            };
            CubeLinks.prototype.MakeNewGroupBase = function (x, y, headInfo) {
                var group = new math.CubeGroup(this.cubeCanvas, headInfo);
                group.highlighter = this.ShowHighlighted.bind(this);
                group.deleteHandler = this.Delete.bind(this);
                group.duplicateHandler = this.Duplicate.bind(this);
                group.rotateHandler = this.Rotate.bind(this);
                this.cubeCanvas.SetGroupPositionValue(group.groupTag, x, y);
                this.allGroups.push(group);
                return group;
            };
            CubeLinks.prototype.MakeNewGroup = function (x, y, headInfo) {
                var group = this.MakeNewGroupBase(x, y, headInfo);
                group.groupTag.appendChild(headInfo.me);
                headInfo.me.setAttribute('x', '0');
                headInfo.me.setAttribute('y', '0');
                headInfo.me.style.position = 'absolute';
                headInfo.me.style.opacity = '1';
                headInfo.parentGroup = group;
                return group;
            };
            CubeLinks.prototype.ShowHighlighted = function (group, flag) {
                if (group) {
                    if (flag) {
                        group.groupTag.setAttribute('filter', 'url(#filterOutline)');
                        group.ShowSplitArrow(true);
                    }
                    else {
                        group.groupTag.setAttribute('filter', '');
                        group.ShowSplitArrow(false);
                    }
                }
            };
            CubeLinks.prototype.SetSelectionBy = function (x, y, w, h) {
                var _a;
                for (var i = 0; i < this.allGroups.length; i++) {
                    var ar = this.allGroups[i].groupTag.getBoundingClientRect();
                    if (!(x > ar.right ||
                        x + w < ar.left ||
                        y > ar.bottom ||
                        y + h < ar.top)) {
                        (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemAdd(this.allGroups[i]);
                    }
                }
            };
            CubeLinks.prototype.Rotate = function (group, degree) {
                var targetRoot = group.groupTag;
                if (targetRoot != null) {
                    var xyr = this.cubeCanvas.GetGroupPositionValue(targetRoot);
                    this.cubeCanvas.SetGroupRotationValue(targetRoot, xyr.r + degree);
                }
            };
            CubeLinks.prototype.Delete = function (targetGroup) {
                if (targetGroup != null && this.allGroups.indexOf(targetGroup) >= 0) {
                    this.cubeCanvas.RemoveGroup(targetGroup.groupTag);
                    this.allGroups.splice(this.allGroups.indexOf(targetGroup), 1);
                }
            };
            CubeLinks.prototype.CopyTo = function (destNode, sourceNode) {
                if (sourceNode.bottomChild) {
                    var copy = sourceNode.bottomChild.me.cloneNode(true);
                    var copyli = new math.LinkInfo(copy);
                    copyli.parentGroup = destNode.parentGroup;
                    copyli.upParent = destNode;
                    destNode.parentGroup.groupTag.insertBefore(copy, destNode.parentGroup.groupTag.firstChild);
                    destNode.bottomChild = copyli;
                    this.CopyTo(destNode.bottomChild, sourceNode.bottomChild);
                }
                if (sourceNode.leftChild) {
                    var copy = sourceNode.leftChild.me.cloneNode(true);
                    var copyli = new math.LinkInfo(copy);
                    copyli.parentGroup = destNode.parentGroup;
                    copyli.upParent = destNode;
                    destNode.parentGroup.groupTag.insertBefore(copy, destNode.parentGroup.groupTag.firstChild);
                    destNode.leftChild = copyli;
                    this.CopyTo(destNode.leftChild, sourceNode.leftChild);
                }
                if (sourceNode.rightChild) {
                    var copy = sourceNode.rightChild.me.cloneNode(true);
                    var copyli = new math.LinkInfo(copy);
                    copyli.parentGroup = destNode.parentGroup;
                    copyli.upParent = destNode;
                    destNode.parentGroup.groupTag.insertBefore(copy, destNode.parentGroup.groupTag.firstChild);
                    destNode.rightChild = copyli;
                    this.CopyTo(destNode.rightChild, sourceNode.rightChild);
                }
            };
            CubeLinks.prototype.Duplicate = function (targetGroup) {
                var _a, _b, _c;
                if (!targetGroup)
                    return;
                var orgXY = this.cubeCanvas.GetGroupPositionValue(targetGroup.groupTag);
                var headTag = targetGroup.headCube.me.cloneNode(true);
                var newHeadInfo = new math.LinkInfo(headTag);
                var newGroup = this.MakeNewGroup(0, 0, newHeadInfo);
                this.CopyTo(newHeadInfo, targetGroup.headCube);
                this.cubeCanvas.SetGroupPositionValue(newGroup.groupTag, orgXY.x + 70, orgXY.y + 10);
                this.cubeCanvas.SetGroupRotationWithPivot(newGroup.groupTag, orgXY.r, orgXY.x + 70, orgXY.y + 10);
                (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.SelectItemAdd(newGroup);
                (_c = upred.ui.uiModule) === null || _c === void 0 ? void 0 : _c.duplicated.push(newGroup);
            };
            CubeLinks.prototype.RestoreInitialState = function () {
                this.cubeCanvas
                    .GetTag()
                    .setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:400;');
                for (var i = 0; i < this.allGroups.length; i++) {
                    this.cubeCanvas.RemoveGroup(this.allGroups[i].groupTag);
                }
                this.allGroups = [];
            };
            CubeLinks.prototype.EnableInteraction = function () {
                this.cubeCanvas.MoveToFront();
                this.cubeCanvas
                    .GetTag()
                    .setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:750;');
            };
            CubeLinks.prototype.DisableInteraction = function () {
                this.cubeCanvas
                    .GetTag()
                    .setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:400;');
            };
            CubeLinks.prototype.Init = function () {
                this.InitPalette();
                upred.ui.GuideViewer.Show('./asset/guide.png');
            };
            return CubeLinks;
        }());
        math.CubeLinks = CubeLinks;
    })(math = upred.math || (upred.math = {}));
})(upred || (upred = {}));
var upred;
(function (upred) {
    var math;
    (function (math) {
        var CubeGroup = (function () {
            function CubeGroup(canvas, headInfo) {
                this.splitArrows = [];
                this.splitLTarget = null;
                this.holes = [];
                this.svgCanvas = canvas;
                this.groupTag = canvas.AddGroup();
                upred.ui.HTML.setStyle(this.groupTag, {
                    position: 'absolute',
                });
                this.headCube = headInfo;
                this.markerCube = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                this.markerCube.setAttribute('href', '#ShadowCube');
                this.markerCube.setAttribute('x', '0');
                this.markerCube.setAttribute('y', '0');
                this.markerCube.style.overflow = 'visible';
                this.markerInfo = new math.LinkInfo(this.markerCube);
            }
            CubeGroup.prototype.CheckCollision = function (x1, y1, x2, y2) {
                var half = upred.ui.mathModule.CUBEHEIGHT;
                var dist = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
                if (dist < (half * half))
                    return true;
                return false;
            };
            CubeGroup.prototype.ShowAttachmentPreview = function (flag) {
                if (flag) {
                    this.groupTag.appendChild(this.markerCube);
                    this.AlignCubes(this.headCube, 0, 0, 0);
                    this.markerCube.setAttribute('filter', '');
                }
                else {
                    if (this.groupTag.contains(this.markerCube)) {
                        this.groupTag.removeChild(this.markerCube);
                    }
                    if (this.markerInfo.upParent) {
                        if (this.markerInfo.upParent.bottomChild == this.markerInfo)
                            this.markerInfo.upParent.bottomChild = undefined;
                        else if (this.markerInfo.upParent.leftChild == this.markerInfo)
                            this.markerInfo.upParent.leftChild = undefined;
                        else if (this.markerInfo.upParent.rightChild == this.markerInfo)
                            this.markerInfo.upParent.rightChild = undefined;
                    }
                    this.markerInfo.upParent = undefined;
                }
            };
            CubeGroup.prototype.UpdateHoleInfo = function (baseDegree) {
                this.holes = [];
                var nr = baseDegree / 90;
                if (nr < 0)
                    nr += 4;
                if (nr >= 4)
                    nr = nr % 4;
                baseDegree = nr * 90;
                this.MakeHoleInfo(undefined, this.headCube, math.SideType.NONE, 0, 0, baseDegree);
            };
            CubeGroup.prototype.MakeHoleInfo = function (pnode, me, side, x, y, baseDegree) {
                var nr = baseDegree / 90;
                if (nr < 0)
                    nr += 4;
                if (nr >= 4)
                    nr = nr % 4;
                baseDegree = nr * 90;
                var CH = upred.ui.mathModule.CUBEHEIGHT;
                if (!me || me == this.markerInfo) {
                    if (pnode) {
                        var hinfo = new math.HoleInfo(pnode, side, x, y);
                        this.holes.push(hinfo);
                    }
                }
                else {
                    switch (nr) {
                        case 0:
                            this.MakeHoleInfo(me, me.bottomChild, math.SideType.BOTTOM, x, y + CH, baseDegree);
                            break;
                        case 1:
                            this.MakeHoleInfo(me, me.bottomChild, math.SideType.BOTTOM, x - CH, y, baseDegree);
                            break;
                        case 2:
                            this.MakeHoleInfo(me, me.bottomChild, math.SideType.BOTTOM, x, y - CH, baseDegree);
                            break;
                        case 3:
                            this.MakeHoleInfo(me, me.bottomChild, math.SideType.BOTTOM, x + CH, y, baseDegree);
                            break;
                    }
                    switch (nr) {
                        case 0:
                            this.MakeHoleInfo(me, me.leftChild, math.SideType.LEFT, x - CH, y, baseDegree + 90);
                            break;
                        case 1:
                            this.MakeHoleInfo(me, me.leftChild, math.SideType.LEFT, x, y - CH, baseDegree + 90);
                            break;
                        case 2:
                            this.MakeHoleInfo(me, me.leftChild, math.SideType.LEFT, x + CH, y, baseDegree + 90);
                            break;
                        case 3:
                            this.MakeHoleInfo(me, me.leftChild, math.SideType.LEFT, x, y + CH, baseDegree + 90);
                            break;
                    }
                    switch (nr) {
                        case 0:
                            this.MakeHoleInfo(me, me.rightChild, math.SideType.RIGHT, x + CH, y, baseDegree - 90);
                            break;
                        case 1:
                            this.MakeHoleInfo(me, me.rightChild, math.SideType.RIGHT, x, y + CH, baseDegree - 90);
                            break;
                        case 2:
                            this.MakeHoleInfo(me, me.rightChild, math.SideType.RIGHT, x - CH, y, baseDegree - 90);
                            break;
                        case 3:
                            this.MakeHoleInfo(me, me.rightChild, math.SideType.RIGHT, x, y - CH, baseDegree - 90);
                            break;
                    }
                }
            };
            CubeGroup.prototype.ResetMarkerInfo = function (selfCube) {
                this.markerInfo.parentGroup = this;
                if (this.markerInfo.upParent) {
                    if (this.markerInfo.upParent.bottomChild == this.markerInfo)
                        this.markerInfo.upParent.bottomChild = undefined;
                    else if (this.markerInfo.upParent.leftChild == this.markerInfo)
                        this.markerInfo.upParent.leftChild = undefined;
                    else if (this.markerInfo.upParent.rightChild == this.markerInfo)
                        this.markerInfo.upParent.rightChild = undefined;
                }
                this.markerInfo.upParent = selfCube;
            };
            CubeGroup.prototype.CheckAttachable = function (targetX, targetY, selfCube, baseDegree, myX, myY) {
                var attachable = false;
                var nr = baseDegree / 90;
                if (nr < 0)
                    nr += 4;
                if (nr >= 4)
                    nr = nr % 4;
                baseDegree = nr * 90;
                var CH = upred.ui.mathModule.CUBEHEIGHT;
                if (selfCube.bottomChild && selfCube.bottomChild != this.markerInfo) {
                    switch (nr) {
                        case 0:
                            attachable = this.CheckAttachable(targetX, targetY, selfCube.bottomChild, baseDegree, myX, myY + CH);
                            break;
                        case 1:
                            attachable = this.CheckAttachable(targetX, targetY, selfCube.bottomChild, baseDegree, myX - CH, myY);
                            break;
                        case 2:
                            attachable = this.CheckAttachable(targetX, targetY, selfCube.bottomChild, baseDegree, myX, myY - CH);
                            break;
                        case 3:
                            attachable = this.CheckAttachable(targetX, targetY, selfCube.bottomChild, baseDegree, myX + CH, myY);
                            break;
                    }
                    if (attachable)
                        return true;
                }
                else {
                    switch (nr) {
                        case 0:
                            attachable = this.CheckCollision(myX, myY + CH, targetX, targetY);
                            break;
                        case 1:
                            attachable = this.CheckCollision(myX - CH, myY, targetX, targetY);
                            break;
                        case 2:
                            attachable = this.CheckCollision(myX, myY - CH, targetX, targetY);
                            break;
                        case 3:
                            attachable = this.CheckCollision(myX + CH, myY, targetX, targetY);
                            break;
                    }
                    if (attachable) {
                        this.ResetMarkerInfo(selfCube);
                        selfCube.bottomChild = this.markerInfo;
                        return true;
                    }
                }
                if (selfCube.leftChild && selfCube.leftChild != this.markerInfo) {
                    switch (nr) {
                        case 0:
                            attachable = this.CheckAttachable(targetX, targetY, selfCube.leftChild, baseDegree + 90, myX - CH, myY);
                            break;
                        case 1:
                            attachable = this.CheckAttachable(targetX, targetY, selfCube.leftChild, baseDegree + 90, myX, myY - CH);
                            break;
                        case 2:
                            attachable = this.CheckAttachable(targetX, targetY, selfCube.leftChild, baseDegree + 90, myX + CH, myY);
                            break;
                        case 3:
                            attachable = this.CheckAttachable(targetX, targetY, selfCube.leftChild, baseDegree + 90, myX, myY + CH);
                            break;
                    }
                    if (attachable)
                        return true;
                }
                else {
                    switch (nr) {
                        case 0:
                            attachable = this.CheckCollision(myX - CH, myY, targetX, targetY);
                            break;
                        case 1:
                            attachable = this.CheckCollision(myX, myY - CH, targetX, targetY);
                            break;
                        case 2:
                            attachable = this.CheckCollision(myX + CH, myY, targetX, targetY);
                            break;
                        case 3:
                            attachable = this.CheckCollision(myX, myY + CH, targetX, targetY);
                            break;
                    }
                    if (attachable) {
                        this.ResetMarkerInfo(selfCube);
                        selfCube.leftChild = this.markerInfo;
                        return true;
                    }
                }
                if (selfCube.rightChild && selfCube.rightChild != this.markerInfo) {
                    switch (nr) {
                        case 0:
                            attachable = this.CheckAttachable(targetX, targetY, selfCube.rightChild, baseDegree - 90, myX + CH, myY);
                            break;
                        case 1:
                            attachable = this.CheckAttachable(targetX, targetY, selfCube.rightChild, baseDegree - 90, myX, myY + CH);
                            break;
                        case 2:
                            attachable = this.CheckAttachable(targetX, targetY, selfCube.rightChild, baseDegree - 90, myX - CH, myY);
                            break;
                        case 3:
                            attachable = this.CheckAttachable(targetX, targetY, selfCube.rightChild, baseDegree - 90, myX, myY - CH);
                            break;
                    }
                    if (attachable)
                        return true;
                }
                else {
                    switch (nr) {
                        case 0:
                            attachable = this.CheckCollision(myX + CH, myY, targetX, targetY);
                            break;
                        case 1:
                            attachable = this.CheckCollision(myX, myY + CH, targetX, targetY);
                            break;
                        case 2:
                            attachable = this.CheckCollision(myX - CH, myY, targetX, targetY);
                            break;
                        case 3:
                            attachable = this.CheckCollision(myX, myY - CH, targetX, targetY);
                            break;
                    }
                    if (attachable) {
                        this.ResetMarkerInfo(selfCube);
                        selfCube.rightChild = this.markerInfo;
                        return true;
                    }
                }
                return false;
            };
            CubeGroup.prototype.AttachCubes = function (childGroup) {
                if (this.markerInfo.upParent) {
                    childGroup.headCube.upParent = this.markerInfo.upParent;
                    if (this.markerInfo.upParent.leftChild == this.markerInfo) {
                        this.markerInfo.upParent.leftChild = childGroup.headCube;
                    }
                    if (this.markerInfo.upParent.rightChild == this.markerInfo) {
                        this.markerInfo.upParent.rightChild = childGroup.headCube;
                    }
                    if (this.markerInfo.upParent.bottomChild == this.markerInfo) {
                        this.markerInfo.upParent.bottomChild = childGroup.headCube;
                    }
                    this.markerInfo.upParent = undefined;
                    if (this.groupTag.contains(this.markerCube)) {
                        this.groupTag.removeChild(this.markerCube);
                    }
                    while (childGroup.groupTag.lastChild) {
                        this.groupTag.insertBefore(childGroup.groupTag.lastChild, this.groupTag.firstChild);
                    }
                    this.AlignCubes(this.headCube, 0, 0, 0);
                    return true;
                }
                return false;
            };
            CubeGroup.prototype.ShowSplitArrow = function (flag) {
                for (var i = 0; i < this.splitArrows.length; i++) {
                    if (this.groupTag.contains(this.splitArrows[i]))
                        this.groupTag.removeChild(this.splitArrows[i]);
                }
                this.splitArrows = [];
                if (!flag)
                    return;
                this.AddSplitArrow(this.headCube, 0, 0, 0);
            };
            CubeGroup.prototype.MakeSplitArrow = function (x, y, r, target) {
                var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                arrow.setAttribute('href', '#splitArrow');
                arrow.setAttribute('x', '0');
                arrow.setAttribute('y', '0');
                arrow.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + r + 'deg)';
                arrow.style.opacity = '0.8';
                arrow.style.pointerEvents = 'visiblePainted';
                arrow.SPLIT_LINKTARGET = target;
                arrow.SPLIT_ROTATION = r;
                this.groupTag.appendChild(arrow);
                this.splitArrows.push(arrow);
                arrow.onpointerdown = this.OnSplitArrowDown.bind(this);
                arrow.onpointerup = this.OnSplitArrowUp.bind(this);
            };
            CubeGroup.prototype.OnSplitArrowDown = function (e) {
                e.currentTarget.style.opacity = '1';
                e.preventDefault();
                e.stopPropagation();
                this.splitLTarget = e.currentTarget;
            };
            CubeGroup.prototype.OnSplitArrowUp = function (e) {
                var _a, _b;
                e.currentTarget.style.opacity = '0.8';
                if (e.currentTarget != this.splitLTarget)
                    return;
                this.splitLTarget = null;
                e.preventDefault();
                e.stopPropagation();
                var newHead = (e.currentTarget.SPLIT_LINKTARGET);
                var rot = e.currentTarget.SPLIT_ROTATION;
                if (!newHead.upParent)
                    return;
                if (newHead.upParent.bottomChild == newHead)
                    newHead.upParent.bottomChild = undefined;
                if (newHead.upParent.leftChild == newHead)
                    newHead.upParent.leftChild = undefined;
                if (newHead.upParent.rightChild == newHead)
                    newHead.upParent.rightChild = undefined;
                var xy = newHead.me.getBoundingClientRect();
                var tgroup = upred.ui.mathModule.MakeNewGroup((xy.left + xy.right) / 2, (xy.top + xy.bottom) / 2, newHead);
                this.PasteTo(tgroup.groupTag, newHead);
                tgroup.AlignCubes(newHead, 0, 0, 0);
                this.svgCanvas.SetGroupRotationWithPivot(tgroup.groupTag, rot, (xy.left + xy.right) / 2, (xy.top + xy.bottom) / 2);
                (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.SelectItemAdd(tgroup);
            };
            CubeGroup.prototype.PasteTo = function (gTag, li) {
                gTag.insertBefore(li.me, gTag.firstChild);
                if (li.bottomChild)
                    this.PasteTo(gTag, li.bottomChild);
                if (li.leftChild)
                    this.PasteTo(gTag, li.leftChild);
                if (li.rightChild)
                    this.PasteTo(gTag, li.rightChild);
            };
            CubeGroup.prototype.AddSplitArrow = function (current, baseDegree, baseX, baseY) {
                var nr = baseDegree / 90;
                if (nr < 0)
                    nr += 4;
                if (nr >= 4)
                    nr = nr % 4;
                baseDegree = nr * 90;
                var CH = upred.ui.mathModule.CUBEHEIGHT;
                var H = Math.floor(CH / 2);
                if (current.bottomChild && current.bottomChild != this.markerInfo) {
                    switch (nr) {
                        case 0:
                            this.MakeSplitArrow(baseX, baseY + H, baseDegree, current.bottomChild);
                            this.AddSplitArrow(current.bottomChild, baseDegree, baseX, baseY + CH);
                            break;
                        case 1:
                            this.MakeSplitArrow(baseX - H, baseY, baseDegree, current.bottomChild);
                            this.AddSplitArrow(current.bottomChild, baseDegree, baseX - CH, baseY);
                            break;
                        case 2:
                            this.MakeSplitArrow(baseX, baseY - H, baseDegree, current.bottomChild);
                            this.AddSplitArrow(current.bottomChild, baseDegree, baseX, baseY - CH);
                            break;
                        case 3:
                            this.MakeSplitArrow(baseX + H, baseY, baseDegree, current.bottomChild);
                            this.AddSplitArrow(current.bottomChild, baseDegree, baseX + CH, baseY);
                            break;
                    }
                }
                if (current.leftChild && current.leftChild != this.markerInfo) {
                    switch (nr) {
                        case 0:
                            this.MakeSplitArrow(baseX - H, baseY, baseDegree + 90, current.leftChild);
                            this.AddSplitArrow(current.leftChild, baseDegree + 90, baseX - CH, baseY);
                            break;
                        case 1:
                            this.MakeSplitArrow(baseX, baseY - H, baseDegree + 90, current.leftChild);
                            this.AddSplitArrow(current.leftChild, baseDegree + 90, baseX, baseY - CH);
                            break;
                        case 2:
                            this.MakeSplitArrow(baseX + H, baseY, baseDegree + 90, current.leftChild);
                            this.AddSplitArrow(current.leftChild, baseDegree + 90, baseX + CH, baseY);
                            break;
                        case 3:
                            this.MakeSplitArrow(baseX, baseY + H, baseDegree + 90, current.leftChild);
                            this.AddSplitArrow(current.leftChild, baseDegree + 90, baseX, baseY + CH);
                            break;
                    }
                }
                if (current.rightChild && current.rightChild != this.markerInfo) {
                    switch (nr) {
                        case 0:
                            this.MakeSplitArrow(baseX + H, baseY, baseDegree - 90, current.rightChild);
                            this.AddSplitArrow(current.rightChild, baseDegree - 90, baseX + CH, baseY);
                            break;
                        case 1:
                            this.MakeSplitArrow(baseX, baseY + H, baseDegree - 90, current.rightChild);
                            this.AddSplitArrow(current.rightChild, baseDegree - 90, baseX, baseY + CH);
                            break;
                        case 2:
                            this.MakeSplitArrow(baseX - H, baseY, baseDegree - 90, current.rightChild);
                            this.AddSplitArrow(current.rightChild, baseDegree - 90, baseX - CH, baseY);
                            break;
                        case 3:
                            this.MakeSplitArrow(baseX, baseY - H, baseDegree - 90, current.rightChild);
                            this.AddSplitArrow(current.rightChild, baseDegree - 90, baseX, baseY - CH);
                            break;
                    }
                }
            };
            CubeGroup.prototype.AlignCubes = function (current, baseDegree, baseX, baseY) {
                var nr = baseDegree / 90;
                if (nr < 0)
                    nr += 4;
                if (nr >= 4)
                    nr = nr % 4;
                baseDegree = nr * 90;
                current.parentGroup = this;
                current.me.setAttribute('x', '0');
                current.me.setAttribute('y', '0');
                current.me.style.transform = 'translate(' + baseX + 'px,' + baseY + 'px) rotate(' + (baseDegree) + 'deg)';
                var CH = upred.ui.mathModule.CUBEHEIGHT;
                if (current.bottomChild) {
                    switch (nr) {
                        case 0:
                            this.AlignCubes(current.bottomChild, baseDegree, baseX, baseY + CH);
                            break;
                        case 1:
                            this.AlignCubes(current.bottomChild, baseDegree, baseX - CH, baseY);
                            break;
                        case 2:
                            this.AlignCubes(current.bottomChild, baseDegree, baseX, baseY - CH);
                            break;
                        case 3:
                            this.AlignCubes(current.bottomChild, baseDegree, baseX + CH, baseY);
                            break;
                    }
                }
                if (current.leftChild) {
                    switch (nr) {
                        case 0:
                            this.AlignCubes(current.leftChild, baseDegree + 90, baseX - CH, baseY);
                            break;
                        case 1:
                            this.AlignCubes(current.leftChild, baseDegree + 90, baseX, baseY - CH);
                            break;
                        case 2:
                            this.AlignCubes(current.leftChild, baseDegree + 90, baseX + CH, baseY);
                            break;
                        case 3:
                            this.AlignCubes(current.leftChild, baseDegree + 90, baseX, baseY + CH);
                            break;
                    }
                }
                if (current.rightChild) {
                    switch (nr) {
                        case 0:
                            this.AlignCubes(current.rightChild, baseDegree - 90, baseX + CH, baseY);
                            break;
                        case 1:
                            this.AlignCubes(current.rightChild, baseDegree - 90, baseX, baseY + CH);
                            break;
                        case 2:
                            this.AlignCubes(current.rightChild, baseDegree - 90, baseX - CH, baseY);
                            break;
                        case 3:
                            this.AlignCubes(current.rightChild, baseDegree - 90, baseX, baseY - CH);
                            break;
                    }
                }
            };
            return CubeGroup;
        }());
        math.CubeGroup = CubeGroup;
    })(math = upred.math || (upred.math = {}));
})(upred || (upred = {}));
//# sourceMappingURL=cubelinks.js.map