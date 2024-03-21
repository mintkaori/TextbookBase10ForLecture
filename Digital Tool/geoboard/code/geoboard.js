"use strict";
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
    var math;
    (function (math) {
        var Board = (function () {
            function Board(canvas) {
                this.type = "board";
                this.points = [];
                this.attachedBands = [];
                this.groupTag = canvas.AddGroup();
                upred.ui.HTML.setStyle(this.groupTag, {
                    position: 'absolute',
                });
                this.pointGroupTag = canvas.AddGroup();
                upred.ui.HTML.setStyle(this.pointGroupTag, {
                    position: 'absolute',
                });
            }
            Board.prototype.SetColor = function (r, g, b) {
                var fill = this.MakeRGB(r, g, b, 1);
                var stroke = this.MakeRGB(r, g, b, 0.5);
                for (var i = 0; i < this.groupTag.children.length; i++) {
                    if (this.groupTag.children[i].nodeName == 'TEXT'
                        || this.groupTag.children[i].nodeName == 'text')
                        continue;
                    this.groupTag.children[i].style.fill = fill;
                    this.groupTag.children[i].style.stroke = stroke;
                }
                for (var i = 0; i < this.pointGroupTag.children.length; i++) {
                    if (this.pointGroupTag.children[i].nodeName == 'TEXT'
                        || this.pointGroupTag.children[i].nodeName == 'text')
                        continue;
                    this.pointGroupTag.children[i].style.fill = fill;
                    this.pointGroupTag.children[i].style.stroke = stroke;
                }
            };
            Board.prototype.MakeRGB = function (r, g, b, m) {
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
            Board.prototype.MakeTagStyled = function (parent, tagname, attr, style) {
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
            Board.prototype.MakeRectBoard = function (colCount, rowCount, width, height) {
                var borderWidth = 8;
                this.points = [];
                var wc = Math.floor(width / colCount);
                var hc = Math.floor(height / rowCount);
                var cellSize = Math.min(wc, hc);
                var realW = cellSize * colCount;
                var realH = cellSize * rowCount;
                var px = [width + 5, width + 5, 5];
                var py = [5, height + 5, height + 5];
                this.MakeTagStyled(this.groupTag, 'path', { d: 'm ' + (realW + borderWidth * 2) + ' 0 l 2 5 l 0 ' + (realH + borderWidth * 2 - 2) + ' l -2 -3 Z' }, { strokeWidth: '1', 'stroke-linejoin': 'bevel', filter: 'brightness(0.8)', pointerEvents: 'none', touchAction: 'none', userSelect: 'none' });
                this.MakeTagStyled(this.groupTag, 'path', { d: 'm 0 ' + (realH + borderWidth * 2) + ' l ' + (realW + borderWidth * 2) + ' 0 l 2 3 l ' + (-(realH + borderWidth * 2 - 1)) + ' 0 Z' }, { strokeWidth: '1', 'stroke-linejoin': 'bevel', filter: 'brightness(0.7)', pointerEvents: 'none', touchAction: 'none', userSelect: 'none' });
                this.MakeTagStyled(this.groupTag, 'rect', { x: '0', y: '0', width: (realW + borderWidth * 2).toString(), height: (realH + borderWidth * 2).toString() }, { strokeWidth: '1', 'stroke-linejoin': 'miter', filter: 'brightness(1.2)', pointerEvents: 'none', touchAction: 'none', userSelect: 'none' });
                this.MakeTagStyled(this.groupTag, 'rect', { x: borderWidth.toString(), y: borderWidth.toString(), width: realW.toString(), height: realH.toString() }, { strokeWidth: '1', 'stroke-linejoin': 'miter', touchAction: 'none', userSelect: 'none' });
                var y = borderWidth + cellSize / 2;
                for (var i = 0; i < rowCount; i++) {
                    var x = borderWidth + cellSize / 2;
                    for (var j = 0; j < colCount; j++) {
                        this.MakeTagStyled(this.pointGroupTag, 'circle', { cx: (x + 1).toString(), cy: (y + 2).toString(), r: Board.POINT_RADIUS.toString() }, { strokeWidth: '0', filter: 'brightness(0.6)', pointerEvents: 'none', touchAction: 'none', userSelect: 'none' });
                        this.MakeTagStyled(this.pointGroupTag, 'circle', { cx: x.toString(), cy: y.toString(), r: Board.POINT_RADIUS.toString() }, { strokeWidth: '1', filter: 'brightness(1.2)', pointerEvents: 'none', touchAction: 'none', userSelect: 'none' });
                        this.points.push({ x: x, y: y });
                        x += cellSize;
                    }
                    y += cellSize;
                }
                return { w: realW + borderWidth * 2, h: realH + borderWidth * 2 };
            };
            Board.prototype.MakeCircleBoard = function (circlingCount, radius, innerRadius) {
                var borderWidth = 8;
                this.points = [];
                this.MakeTagStyled(this.groupTag, 'circle', { cx: (radius + 2).toString(), cy: (radius + 3).toString(), r: radius.toString() }, { strokeWidth: '1', filter: 'brightness(0.7)', pointerEvents: 'none', touchAction: 'none', userSelect: 'none' });
                this.MakeTagStyled(this.groupTag, 'circle', { cx: radius.toString(), cy: radius.toString(), r: radius.toString() }, { strokeWidth: '1', filter: 'brightness(1.2)', pointerEvents: 'none', touchAction: 'none', userSelect: 'none' });
                this.MakeTagStyled(this.groupTag, 'circle', { cx: radius.toString(), cy: radius.toString(), r: (radius - borderWidth).toString() }, { strokeWidth: '1', 'stroke-linejoin': 'miter', touchAction: 'none', userSelect: 'none' });
                this.MakeTagStyled(this.pointGroupTag, 'circle', { cx: (radius + 1).toString(), cy: (radius + 2).toString(), r: Board.POINT_RADIUS.toString() }, { strokeWidth: '0', filter: 'brightness(0.6)', pointerEvents: 'none', touchAction: 'none', userSelect: 'none' });
                this.MakeTagStyled(this.pointGroupTag, 'circle', { cx: radius.toString(), cy: radius.toString(), r: Board.POINT_RADIUS.toString() }, { strokeWidth: '1', filter: 'brightness(1.2)', pointerEvents: 'none', touchAction: 'none', userSelect: 'none' });
                this.points.push({ x: radius, y: radius });
                var deltaDegree = 360 / circlingCount;
                var degree = 90;
                for (var i = 0; i < circlingCount; i++) {
                    var rad = (degree / 180) * Math.PI;
                    var dx = innerRadius * Math.cos(rad);
                    var dy = innerRadius * Math.sin(rad);
                    var x = radius + dx;
                    var y = radius + dy;
                    this.MakeTagStyled(this.pointGroupTag, 'circle', { cx: (x + 1).toString(), cy: (y + 2).toString(), r: Board.POINT_RADIUS.toString() }, { strokeWidth: '0', filter: 'brightness(0.6)', pointerEvents: 'none', touchAction: 'none', userSelect: 'none' });
                    this.MakeTagStyled(this.pointGroupTag, 'circle', { cx: x.toString(), cy: y.toString(), r: Board.POINT_RADIUS.toString() }, { strokeWidth: '1', filter: 'brightness(1.2)', pointerEvents: 'none', touchAction: 'none', userSelect: 'none' });
                    this.points.push({ x: x, y: y });
                    degree += deltaDegree;
                }
                return { w: radius * 2, h: radius * 2 };
            };
            Board.POINT_RADIUS = 4;
            return Board;
        }());
        math.Board = Board;
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
    var math;
    (function (math) {
        var GeoLine = (function () {
            function GeoLine(canvas) {
                this.points = [];
                this.circleAreaTags = [];
                this.circleTags = [];
                this.lineTags = [];
                this.startP1Index = -1;
                this.startP2Index = -1;
                this.lastAttachedIndex = -1;
                this.type = "line";
                this.lastColor = '#000000';
                this.attached = false;
                this.groupTag = canvas.AddGroup();
                this.svgCanvas = canvas;
                upred.ui.HTML.setStyle(this.groupTag, {
                    position: 'absolute',
                });
                this.linesRootTag = this.MakeTagStyled(this.groupTag, 'g', {}, { position: 'absolute' });
                this.pointsAreaRootTag = this.MakeTagStyled(this.groupTag, 'g', {}, { position: 'absolute' });
                this.pointsRootTag = this.MakeTagStyled(this.groupTag, 'g', {}, { position: 'absolute' });
            }
            GeoLine.prototype.SetColor = function (r, g, b) {
                this.lastColor = this.MakeRGB(r, g, b, 1);
                this.groupTag.style.stroke = this.lastColor;
            };
            GeoLine.prototype.ApplyColor = function () {
                this.groupTag.style.stroke = this.lastColor;
            };
            GeoLine.prototype.MakeRGB = function (r, g, b, m) {
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
            GeoLine.prototype.MakeTagStyled = function (parent, tagname, attr, style) {
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
            GeoLine.prototype.MakeBand = function () {
                this.orgBandTag = this.MakeTagStyled(this.groupTag, 'path', { d: 'M 6 25 C 2 -3 32 1 31 24 C 30 39 28 30 30 58 C 31 76 38 84 30 92 C 19 101 12 91 9 85 C 4 77 6 64 8 53 C 12 39 7 37 6 25 Z' }, { fill: 'transparent', strokeWidth: '5' });
            };
            GeoLine.prototype.SplitLine = function (targetTag, pageX, pageY) {
                if (!this.attached)
                    return null;
                var index = this.lineTags.indexOf(targetTag);
                var pxy = this.svgCanvas.GetGroupPositionValue(this.groupTag);
                var mx = pageX - pxy.x;
                var my = pageY - pxy.y;
                var ct = this.MakeTagStyled(this.pointsRootTag, 'circle', { cx: mx, cy: my, r: 7 }, { fill: 'transparent', strokeWidth: '5', pointerEvents: 'none' });
                var cta = this.MakeTagStyled(this.pointsAreaRootTag, 'circle', { cx: mx, cy: my, r: 17 }, { fill: 'transparent', strokeWidth: '1', stroke: 'rgb(0,0,0,0.2)', cursor: 'pointer' });
                var lineTag = this.MakeTagStyled(this.linesRootTag, 'line', { x1: mx, y1: my, x2: mx + 1, y2: my + 1 }, { fill: 'transparent', strokeWidth: '10', lineCap: 'round', opacity: '0', cursor: 'pointer' });
                if (index == 0) {
                    this.circleTags.push(ct);
                    this.circleAreaTags.push(cta);
                    this.points.push({ x: mx, y: my });
                    this.lineTags.push(lineTag);
                    this.UpdateLine(this.points.length - 1, '1');
                }
                else {
                    this.circleTags.splice(index, 0, ct);
                    this.circleAreaTags.splice(index, 0, cta);
                    this.points.splice(index, 0, { x: mx, y: my });
                    this.lineTags.splice(index, 0, lineTag);
                    this.UpdateLine(index, '1');
                }
                return { point: cta, x: mx, y: my };
            };
            GeoLine.prototype.FinalMovePoint = function (targetTag, board, nx, ny) {
                var p = this.CheckAttachable(board, nx, ny);
                var index = this.circleAreaTags.indexOf(targetTag);
                this.circleTags[index].style.opacity = '1';
                var delFlag = false;
                if (p >= 0) {
                    nx = board.points[p].x;
                    ny = board.points[p].y;
                    if (this.circleAreaTags.length > 2) {
                        if (index > 0) {
                            var prex = parseFloat(this.circleAreaTags[index - 1].getAttribute('cx'));
                            var prey = parseFloat(this.circleAreaTags[index - 1].getAttribute('cy'));
                            if (nx == prex && ny == prey)
                                delFlag = true;
                        }
                        if (index + 1 < this.circleTags.length) {
                            var nextx = parseFloat(this.circleAreaTags[index + 1].getAttribute('cx'));
                            var nexty = parseFloat(this.circleAreaTags[index + 1].getAttribute('cy'));
                            if (nx == nextx && ny == nexty)
                                delFlag = true;
                        }
                    }
                }
                else {
                    if (this.circleAreaTags.length > 2) {
                        delFlag = true;
                    }
                    else {
                        if (index > 0) {
                            nx = parseFloat(this.circleAreaTags[index - 1].getAttribute('cx'));
                            ny = parseFloat(this.circleAreaTags[index - 1].getAttribute('cy'));
                        }
                        else {
                            nx = parseFloat(this.circleAreaTags[1].getAttribute('cx'));
                            ny = parseFloat(this.circleAreaTags[1].getAttribute('cy'));
                        }
                    }
                }
                if (delFlag) {
                    this.pointsAreaRootTag.removeChild(this.circleAreaTags[index]);
                    this.pointsRootTag.removeChild(this.circleTags[index]);
                    this.circleAreaTags.splice(index, 1);
                    this.circleTags.splice(index, 1);
                    this.points.splice(index, 1);
                    if (index > 0) {
                        this.linesRootTag.removeChild(this.lineTags[index - 1]);
                        this.lineTags.splice(index - 1, 1);
                    }
                    else {
                        this.linesRootTag.removeChild(this.lineTags[index]);
                        this.lineTags.splice(index, 1);
                    }
                    this.UpdateLine(index == 0 ? 0 : index - 1, '1');
                }
                else {
                    this.points[index].x = nx;
                    this.points[index].y = ny;
                    targetTag.setAttribute('cx', nx.toString());
                    targetTag.setAttribute('cy', ny.toString());
                    this.circleTags[index].setAttribute('cx', nx.toString());
                    this.circleTags[index].setAttribute('cy', ny.toString());
                    this.UpdateLine(index, '1');
                    this.lastAttachedIndex = p;
                }
            };
            GeoLine.prototype.ShowMovePoint = function (targetTag, board, nx, ny) {
                var p = this.CheckAttachable(board, nx, ny);
                var index = this.circleAreaTags.indexOf(targetTag);
                if (p != this.lastAttachedIndex) {
                    if (p >= 0) {
                        nx = board.points[p].x;
                        ny = board.points[p].y;
                        this.circleTags[index].style.opacity = '1';
                    }
                    else {
                        this.circleTags[index].style.opacity = '0.5';
                    }
                    this.points[index].x = nx;
                    this.points[index].y = ny;
                    targetTag.setAttribute('cx', nx.toString());
                    targetTag.setAttribute('cy', ny.toString());
                    this.circleTags[index].setAttribute('cx', nx.toString());
                    this.circleTags[index].setAttribute('cy', ny.toString());
                    this.UpdateLine(index, p >= 0 ? '1' : '0.5');
                    this.lastAttachedIndex = p;
                }
                else if (p < 0) {
                    this.points[index].x = nx;
                    this.points[index].y = ny;
                    targetTag.setAttribute('cx', nx.toString());
                    targetTag.setAttribute('cy', ny.toString());
                    this.circleTags[index].setAttribute('cx', nx.toString());
                    this.circleTags[index].setAttribute('cy', ny.toString());
                    this.circleTags[index].style.opacity = '0.5';
                    this.UpdateLine(index, '0.5');
                    this.lastAttachedIndex = p;
                }
            };
            GeoLine.prototype.ShowNewAttachable = function (board, x, y) {
                var bxy = this.svgCanvas.GetGroupPositionValue(board.groupTag);
                var p = this.CheckNewAttachable(board, x - bxy.x, y - bxy.y);
                if (p.p1 != this.startP1Index || p.p2 != this.startP2Index) {
                    if (this.orgBandTag.style.display == 'none') {
                        for (var i = 0; i < this.circleTags.length; i++)
                            this.pointsRootTag.removeChild(this.circleTags[i]);
                        for (var i = 0; i < this.circleAreaTags.length; i++)
                            this.pointsAreaRootTag.removeChild(this.circleAreaTags[i]);
                        for (var i = 0; i < this.lineTags.length; i++)
                            this.linesRootTag.removeChild(this.lineTags[i]);
                        this.circleAreaTags = [];
                        this.circleTags = [];
                        this.lineTags = [];
                        this.points = [];
                    }
                    if (p.p1 >= 0 || p.p2 >= 0) {
                        this.AttachToBoard(board, p.p1, p.p2);
                        this.attached = true;
                        this.attachedBoard = board;
                    }
                    else {
                        this.orgBandTag.style.display = 'block';
                        this.attached = false;
                        this.attachedBoard = undefined;
                    }
                }
                this.startP1Index = p.p1;
                this.startP2Index = p.p2;
                return this.attached;
            };
            GeoLine.prototype.CheckAttachable = function (board, mx, my) {
                var IND = -1;
                for (var i = 0; i < board.points.length; i++) {
                    var BX = board.points[i].x;
                    var BY = board.points[i].y;
                    if (mx >= BX - 14 && mx <= BX + 14 && my >= BY - 14 && my <= BY + 14) {
                        IND = i;
                    }
                }
                return IND;
            };
            GeoLine.prototype.CheckNewAttachable = function (board, mx, my) {
                var sx = mx;
                var sy = my;
                var ex = sx + 40;
                var ey = sy + 100;
                var SPI = -1, EPI = -1;
                for (var i = 0; i < board.points.length; i++) {
                    var BX = board.points[i].x;
                    var BY = board.points[i].y;
                    if (BX >= sx && BX <= ex && BY >= sy && BY <= ey - 50) {
                        SPI = i;
                    }
                }
                for (var i = 0; i < board.points.length; i++) {
                    var BX = board.points[i].x;
                    var BY = board.points[i].y;
                    if (BX >= sx && BX <= ex && BY >= sy + 50 && BY <= ey) {
                        EPI = i;
                    }
                }
                if (SPI < 0 && EPI < 0)
                    return { p1: -1, p2: -1 };
                return { p1: SPI, p2: EPI };
            };
            GeoLine.prototype.MakeNewCirclePoint = function (x, y) {
                var ct = this.MakeTagStyled(this.pointsRootTag, 'circle', { cx: x, cy: y, r: 7 }, { fill: 'transparent', strokeWidth: '5', pointerEvents: 'none' });
                this.circleTags.push(ct);
                var cta = this.MakeTagStyled(this.pointsAreaRootTag, 'circle', { cx: x, cy: y, r: 17 }, { fill: 'transparent', strokeWidth: '1', stroke: 'rgb(0,0,0,0.2)', cursor: 'pointer' });
                this.circleAreaTags.push(cta);
                this.points.push({ x: x, y: y });
            };
            GeoLine.prototype.Highlight = function (flag) {
                for (var i = 0; i < this.circleAreaTags.length; i++) {
                    this.circleAreaTags[i].style.stroke = flag ? 'rgb(0,0,0,0.2)' : 'transparent';
                }
            };
            GeoLine.prototype.AttachToBoard = function (board, p1, p2) {
                if (p1 < 0 && p2 < 0)
                    return;
                var bxy = this.svgCanvas.GetGroupPositionValue(board.groupTag);
                this.svgCanvas.SetGroupPositionValue(this.groupTag, bxy.x, bxy.y);
                if (p1 >= 0) {
                    this.MakeNewCirclePoint(board.points[p1].x, board.points[p1].y);
                    if (p2 < 0)
                        this.MakeNewCirclePoint(board.points[p1].x, board.points[p1].y);
                }
                if (p2 >= 0) {
                    this.MakeNewCirclePoint(board.points[p2].x, board.points[p2].y);
                    if (p1 < 0)
                        this.MakeNewCirclePoint(board.points[p2].x, board.points[p2].y);
                }
                this.RefreshLine();
                this.ApplyColor();
                this.orgBandTag.style.display = 'none';
            };
            GeoLine.prototype.UpdateLinePos = function (preIndex, nowIndex, opacity) {
                var xx = this.points[nowIndex].x - this.points[preIndex].x;
                var yy = this.points[nowIndex].y - this.points[preIndex].y;
                if (xx == 0 && yy == 0) {
                    this.lineTags[nowIndex].style.opacity = '0';
                }
                else {
                    var rad = Math.atan2(yy, xx);
                    var dx = (math.Board.POINT_RADIUS + 2) * Math.cos(rad);
                    var dy = (math.Board.POINT_RADIUS + 2) * Math.sin(rad);
                    this.lineTags[nowIndex].setAttribute('x1', (this.points[preIndex].x + dx).toString());
                    this.lineTags[nowIndex].setAttribute('y1', (this.points[preIndex].y + dy).toString());
                    this.lineTags[nowIndex].setAttribute('x2', (this.points[nowIndex].x - dx).toString());
                    this.lineTags[nowIndex].setAttribute('y2', (this.points[nowIndex].y - dy).toString());
                    this.lineTags[nowIndex].style.opacity = opacity;
                }
            };
            GeoLine.prototype.UpdateLine = function (i, opacity) {
                this.UpdateLinePos(i - 1 < 0 ? this.points.length - 1 : i - 1, i, opacity);
                this.UpdateLinePos(i, i + 1 >= this.points.length ? 0 : i + 1, opacity);
            };
            GeoLine.prototype.RefreshLine = function () {
                for (var i = 0; i < this.points.length; i++) {
                    var lineTag = this.MakeTagStyled(this.linesRootTag, 'line', { x1: '0', y1: '0', x2: '1', y2: '1' }, { fill: 'transparent', strokeWidth: '10', lineCap: 'round', opacity: '0', cursor: 'pointer' });
                    this.lineTags.push(lineTag);
                }
                for (var i = 0; i < this.points.length; i++) {
                    this.UpdateLine(i, '1');
                }
            };
            return GeoLine;
        }());
        math.GeoLine = GeoLine;
    })(math = upred.math || (upred.math = {}));
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
        var DragMode;
        (function (DragMode) {
            DragMode[DragMode["NONE"] = 0] = "NONE";
            DragMode[DragMode["POINT_MOVE"] = 1] = "POINT_MOVE";
            DragMode[DragMode["LINE_SPLIT"] = 2] = "LINE_SPLIT";
            DragMode[DragMode["NEW"] = 3] = "NEW";
        })(DragMode || (DragMode = {}));
        var Geoboard = (function () {
            function Geoboard() {
                this.NSize = 80;
                this.POINTR = 8;
                this.dragMode = DragMode.NONE;
                this.xyBefore = { x: 0, y: 0 };
                this.xyNow = { x: 0, y: 0 };
                this.xyOrg = { x: 0, y: 0, r: 0 };
                this.allObjs = [];
                this.presetColors = [
                    231, 76, 60,
                    230, 126, 34,
                    241, 196, 15,
                    40, 180, 99,
                    52, 152, 219,
                    36, 113, 163,
                    155, 89, 182,
                    46, 64, 83
                ];
                this.boards = [];
            }
            Geoboard.prototype.MakeRGB = function (r, g, b, m) {
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
            Geoboard.prototype.MakePaletteButton = function (imgsrc) {
                var bt = upred.ui.HTML.newNode('button');
                bt.className = 'paletteButtonClass';
                var img = new Image();
                img.src = imgsrc;
                img.width = 54;
                img.height = 100;
                img.style.display = 'inline-block';
                img.style.margin = '8px';
                img.style.touchAction = 'none';
                img.style.objectFit = 'contain';
                img.style.userSelect = 'none';
                bt.appendChild(img);
                this.paletteTag.appendChild(bt);
                return bt;
            };
            Geoboard.prototype.HexToRGB = function (hex) {
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
            Geoboard.prototype.ChangeColor = function (item, colrstr) {
                var color = this.HexToRGB(colrstr);
                if (item.SetColor) {
                    item.SetColor(color.r, color.g, color.b);
                }
            };
            Geoboard.prototype.InitPalette = function () {
                this.svgCanvas = new upred.ui.SVGCanvas();
                this.paletteTag = document.getElementById('UI_PALETTE');
                for (var i = 1; i <= 8; i++) {
                    var btBand = this.MakePaletteButton('./asset/icon_band_' + i + '.png');
                    btBand.COLORINDEXV = i - 1;
                    btBand.addEventListener('pointerdown', this.OnDragStartNewBand.bind(this));
                }
                window.addEventListener('pointermove', this.OnDragging.bind(this));
                window.addEventListener('pointerup', this.OnDragEnd.bind(this));
                this.svgCanvas.dragStarter.line = this.OnLineSplitStart.bind(this);
                this.svgCanvas.dragStarter.circle = this.OnPointMoveStart.bind(this);
                this.svgCanvas.dragStarter.rect = this.OnSelectBoard.bind(this);
                this.svgCanvas.dragStarter.path = this.OnBandMoveStart.bind(this);
            };
            Geoboard.prototype.OnSelectBoard = function (e) {
                var _a, _b;
                if ((_a = this.curBoard) === null || _a === void 0 ? void 0 : _a.groupTag.contains(e.target)) {
                    (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.SelectItemOnlyOne(this.curBoard);
                }
            };
            Geoboard.prototype.OnLineSplitStart = function (e) {
                var _a, _b;
                var usetag = e.target;
                if (!usetag)
                    return;
                this.curDragging = undefined;
                for (var i = 0; i < this.allObjs.length; i++) {
                    if (this.allObjs[i].type == 'line' && this.allObjs[i].linesRootTag == usetag.parentNode) {
                        this.curDragging = this.allObjs[i];
                        this.curDraggingTag = usetag;
                        break;
                    }
                }
                if (!this.curDragging) {
                    (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                    return false;
                }
                (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.SelectItemOnlyOne(this.curDragging);
                this.svgCanvas.SetGroupFront(this.curDragging.groupTag);
                this.xyNow.x = this.xyBefore.x = e.pageX;
                this.xyNow.y = this.xyBefore.y = e.pageY;
                e.preventDefault();
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:900;');
                var result = this.curDragging.SplitLine(this.curDraggingTag, e.pageX, e.pageY);
                if (result) {
                    this.curDraggingTag = result.point;
                    this.xyOrg.x = result.x;
                    this.xyOrg.y = result.y;
                    this.dragMode = DragMode.LINE_SPLIT;
                }
                else {
                    this.curDragging = undefined;
                    this.curDraggingTag = undefined;
                    this.dragMode = DragMode.NONE;
                }
                this.svgCanvas.GetTag().appendChild(this.curBoard.pointGroupTag);
                return true;
            };
            Geoboard.prototype.OnPointMoveStart = function (e) {
                var _a, _b;
                var usetag = e.target;
                if (!usetag)
                    return;
                if (usetag.parentNode == this.curBoard.groupTag) {
                    this.OnSelectBoard(e);
                    return;
                }
                this.curDragging = undefined;
                for (var i = 0; i < this.allObjs.length; i++) {
                    if (this.allObjs[i].type == 'line') {
                        if (this.allObjs[i].pointsAreaRootTag == usetag.parentNode) {
                            this.curDragging = this.allObjs[i];
                            this.curDraggingTag = usetag;
                            break;
                        }
                    }
                }
                if (!this.curDragging) {
                    (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                    return false;
                }
                (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.SelectItemOnlyOne(this.curDragging);
                this.dragMode = DragMode.POINT_MOVE;
                this.xyOrg.x = parseFloat(this.curDraggingTag.getAttribute('cx'));
                this.xyOrg.y = parseFloat(this.curDraggingTag.getAttribute('cy'));
                if (this.curDraggingTag != this.lastDraggedTag && this.lastDraggedTag && this.curDragging.pointsAreaRootTag.contains(this.lastDraggedTag)) {
                    if (this.lastDraggedTag.getAttribute('cx') == this.xyOrg.x
                        && this.lastDraggedTag.getAttribute('cy') == this.xyOrg.y) {
                        this.curDraggingTag = this.lastDraggedTag;
                    }
                }
                this.xyNow.x = this.xyBefore.x = e.pageX;
                this.xyNow.y = this.xyBefore.y = e.pageY;
                e.preventDefault();
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:900;');
                this.svgCanvas.GetTag().appendChild(this.curBoard.pointGroupTag);
                return true;
            };
            Geoboard.prototype.OnBandMoveStart = function (e) {
                var _a, _b, _c;
                var usetag = e.target;
                if (!usetag)
                    return;
                this.curDragging = undefined;
                for (var i = 0; i < this.allObjs.length; i++) {
                    if (this.allObjs[i].type == 'line') {
                        if (this.allObjs[i].orgBandTag == usetag) {
                            this.curDragging = this.allObjs[i];
                            this.curDraggingTag = usetag;
                            break;
                        }
                    }
                }
                if (!this.curDragging) {
                    (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                    return false;
                }
                (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.SelectItemOnlyOne(this.curDragging);
                var xy = (_c = this.svgCanvas) === null || _c === void 0 ? void 0 : _c.GetGroupPositionValue(this.curDragging.groupTag);
                this.xyOrg.x = xy.x;
                this.xyOrg.y = xy.y;
                this.xyNow.x = this.xyBefore.x = e.pageX;
                this.xyNow.y = this.xyBefore.y = e.pageY;
                this.dragMode = DragMode.NEW;
                e.preventDefault();
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:900;');
                return true;
            };
            Geoboard.prototype.OnDragStartNewBand = function (e) {
                var _a;
                if (!e.currentTarget)
                    return;
                var xy = e.currentTarget.getBoundingClientRect();
                this.xyOrg.x = xy.left + xy.width / 4;
                this.xyOrg.y = xy.top;
                this.xyBefore.x = e.pageX;
                this.xyBefore.y = e.pageY;
                e.preventDefault();
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:900;');
                var CN = e.currentTarget.COLORINDEXV;
                var line = new math.GeoLine(this.svgCanvas);
                line.MakeBand();
                line.SetColor(this.presetColors[CN * 3], this.presetColors[CN * 3 + 1], this.presetColors[CN * 3 + 2]);
                this.AssignHandlerAndRegister(line, this.xyOrg.x, this.xyOrg.y);
                (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemOnlyOne(line);
                this.dragMode = DragMode.NEW;
                this.curDragging = line;
                line.groupTag.style.opacity = '1';
                this.svgCanvas.GetTag().appendChild(this.curDragging.groupTag);
                this.svgCanvas.GetTag().appendChild(this.curBoard.pointGroupTag);
            };
            Geoboard.prototype.OnDragging = function (e) {
                if (!this.curDragging)
                    return;
                this.xyNow.x = e.pageX;
                this.xyNow.y = e.pageY;
                var dx = this.xyNow.x - this.xyBefore.x;
                var dy = this.xyNow.y - this.xyBefore.y;
                if (this.curDragging.type == 'line') {
                    switch (this.dragMode) {
                        case DragMode.NEW:
                            {
                                if (!this.curDragging.ShowNewAttachable(this.curBoard, this.xyOrg.x + dx, this.xyOrg.y + dy)) {
                                    this.svgCanvas.SetGroupPositionValue(this.curDragging.groupTag, this.xyOrg.x + dx, this.xyOrg.y + dy);
                                }
                                var pPos = this.paletteTag.getBoundingClientRect();
                                if (e.pageX < pPos.right && e.pageY > pPos.top) {
                                    this.curDragging.groupTag.style.opacity = '0.5';
                                }
                                else {
                                    this.curDragging.groupTag.style.opacity = '1';
                                }
                            }
                            break;
                        case DragMode.POINT_MOVE:
                            {
                                this.curDragging.ShowMovePoint(this.curDraggingTag, this.curBoard, this.xyOrg.x + dx, this.xyOrg.y + dy);
                            }
                            break;
                        case DragMode.LINE_SPLIT:
                            {
                                this.curDragging.ShowMovePoint(this.curDraggingTag, this.curBoard, this.xyOrg.x + dx, this.xyOrg.y + dy);
                            }
                            break;
                    }
                }
            };
            Geoboard.prototype.OnDragEnd = function (e) {
                var _a, _b;
                if (!this.curDragging)
                    return;
                this.EnableInteraction();
                var dx = this.xyNow.x - this.xyBefore.x;
                var dy = this.xyNow.y - this.xyBefore.y;
                this.curDragging.groupTag.style.opacity = '1';
                switch (this.dragMode) {
                    case DragMode.NEW:
                        {
                            var pPos = this.paletteTag.getBoundingClientRect();
                            if (e.pageX < pPos.right && e.pageY > pPos.top) {
                                this.svgCanvas.RemoveGroup(this.curDragging.groupTag);
                                this.allObjs.splice(this.allObjs.indexOf(this.curDragging), 1);
                            }
                            else {
                                (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.UnselectAll();
                                if (dx * dx + dy * dy < 32) {
                                    (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.SelectItemOnlyOne(this.curDragging);
                                }
                            }
                            this.lastDraggedTag = undefined;
                        }
                        break;
                    case DragMode.POINT_MOVE:
                        {
                            this.lastDraggedTag = this.curDraggingTag;
                            this.curDragging.FinalMovePoint(this.curDraggingTag, this.curBoard, this.xyOrg.x + dx, this.xyOrg.y + dy);
                        }
                        break;
                    case DragMode.LINE_SPLIT:
                        {
                            this.lastDraggedTag = this.curDraggingTag;
                            this.curDragging.FinalMovePoint(this.curDraggingTag, this.curBoard, this.xyOrg.x + dx, this.xyOrg.y + dy);
                        }
                        break;
                }
                this.curDragging.Highlight(false);
                this.curDragging = undefined;
                this.dragMode = DragMode.NONE;
                this.svgCanvas.GetTag().appendChild(this.curBoard.pointGroupTag);
                e.preventDefault();
            };
            Geoboard.prototype.RemoveByGroupTag = function (grouptag) {
                var n = -1;
                for (var i = 0; i < this.allObjs.length; i++) {
                    if (this.allObjs[i].groupTag == grouptag) {
                        n = i;
                        break;
                    }
                }
                if (n >= 0)
                    this.allObjs.splice(n, 1);
            };
            Geoboard.prototype.AssignHandlerAndRegister = function (tline, x, y) {
                tline.highlighter = this.ShowHighlighted.bind(this);
                tline.deleteHandler = this.Delete.bind(this);
                tline.duplicateHandler = this.Duplicate.bind(this);
                tline.rotateHandler = this.Rotate.bind(this);
                tline.colorChanger = this.ChangeColor.bind(this);
                this.svgCanvas.SetGroupPositionValue(tline.groupTag, x, y);
                this.allObjs.push(tline);
            };
            Geoboard.prototype.ShowHighlighted = function (group, flag) {
                if (group) {
                    if (flag) {
                        group.groupTag.setAttribute('filter', 'url(#filterOutline)');
                    }
                    else {
                        group.groupTag.setAttribute('filter', '');
                    }
                    if (group.Highlight)
                        group.Highlight(flag);
                }
            };
            Geoboard.prototype.SetSelectionBy = function (x, y, w, h) {
                var _a;
                for (var i = 0; i < this.allObjs.length; i++) {
                    if (this.allObjs[i].type == 'board')
                        continue;
                    var ar = this.allObjs[i].groupTag.getBoundingClientRect();
                    if (!(x > ar.right ||
                        x + w < ar.left ||
                        y > ar.bottom ||
                        y + h < ar.top)) {
                        (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.SelectItemAdd(this.allObjs[i]);
                    }
                }
            };
            Geoboard.prototype.Rotate = function (group, degree) {
            };
            Geoboard.prototype.Delete = function (targetGroup) {
                if (targetGroup != null && this.allObjs.indexOf(targetGroup) >= 0) {
                    this.svgCanvas.RemoveGroup(targetGroup.groupTag);
                    this.allObjs.splice(this.allObjs.indexOf(targetGroup), 1);
                }
            };
            Geoboard.prototype.Duplicate = function (targetGroup) {
            };
            Geoboard.prototype.RestoreInitialState = function () {
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:400;');
                for (var i = 0; i < this.boards.length; i++) {
                    if (this.svgCanvas.GetTag().contains(this.boards[i].groupTag)) {
                        this.svgCanvas.GetTag().removeChild(this.boards[i].groupTag);
                        this.svgCanvas.GetTag().removeChild(this.boards[i].pointGroupTag);
                    }
                    this.svgCanvas.RemoveGroup(this.boards[i].groupTag);
                }
                for (var i = 0; i < this.allObjs.length; i++) {
                    this.svgCanvas.RemoveGroup(this.allObjs[i].groupTag);
                }
                this.allObjs = [];
                this.InitBoards();
                this.OnClickBoardRect();
            };
            Geoboard.prototype.EnableInteraction = function () {
                this.svgCanvas.MoveToFront();
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:750;');
            };
            Geoboard.prototype.DisableInteraction = function () {
                this.svgCanvas.GetTag().setAttribute('style', 'position:absolute; left:0px; top:0px; z-index:400;');
            };
            Geoboard.prototype.ChangeBoard = function (sel) {
                for (var i = 0; i < this.boards.length; i++) {
                    if (i == sel) {
                        this.svgCanvas.GetTag().insertBefore(this.boards[sel].groupTag, this.svgCanvas.GetTag().firstChild);
                    }
                    else {
                        if (this.svgCanvas.GetTag().contains(this.boards[i].groupTag)) {
                            this.svgCanvas.GetTag().removeChild(this.boards[i].groupTag);
                            this.svgCanvas.GetTag().removeChild(this.boards[i].pointGroupTag);
                        }
                    }
                }
                for (var i = 0; i < this.allObjs.length; i++) {
                    if (this.allObjs[i].type == 'line') {
                        if (!this.allObjs[i].attached || this.allObjs[i].attachedBoard == this.boards[sel]) {
                            this.svgCanvas.GetTag().appendChild(this.allObjs[i].groupTag);
                        }
                        else {
                            if (this.svgCanvas.GetTag().contains(this.allObjs[i].groupTag))
                                this.svgCanvas.GetTag().removeChild(this.allObjs[i].groupTag);
                        }
                    }
                }
                this.svgCanvas.GetTag().appendChild(this.boards[sel].pointGroupTag);
                this.curBoard = this.boards[sel];
            };
            Geoboard.prototype.OnClickBoardRect = function () {
                this.ChangeBoard(0);
            };
            Geoboard.prototype.OnClickBoardCircle = function () {
                this.ChangeBoard(1);
            };
            Geoboard.prototype.OnClickBoardRectWide = function () {
                this.ChangeBoard(2);
            };
            Geoboard.prototype.InitBoards = function () {
                var csize = this.svgCanvas.GetTag().getBoundingClientRect();
                var psize = document.getElementById('UI_PALETTE').getBoundingClientRect();
                var tsize = document.getElementById('UI_TOOLBAR').getBoundingClientRect();
                var RW = csize.width;
                var RH = csize.height;
                var XADD = 0;
                if (csize.top >= psize.top) {
                    RW -= psize.width;
                    XADD = psize.width;
                    RH -= tsize.height;
                }
                else {
                    RH -= psize.height;
                    RW -= tsize.width;
                }
                this.boards[0] = new math.Board(this.svgCanvas);
                var wh = this.boards[0].MakeRectBoard(10, 10, Math.floor(RW * 0.85), Math.floor(RH * 0.85));
                this.boards[0].SetColor(20, 143, 119);
                var circleR = Math.min(RW, RH);
                this.boards[1] = new math.Board(this.svgCanvas);
                var wh2 = this.boards[1].MakeCircleBoard(12, Math.floor(circleR * 0.85 / 2), Math.floor(circleR * 0.75 / 2));
                this.boards[2] = new math.Board(this.svgCanvas);
                var wh3 = this.boards[2].MakeRectBoard(20, 10, Math.floor(RW * 0.85), Math.floor(RH * 0.85));
                this.boards[2].SetColor(20, 143, 119);
                this.boards[0].SetColor(20, 143, 119);
                this.boards[1].SetColor(20, 143, 119);
                this.boards[2].SetColor(20, 143, 119);
                this.AssignHandlerAndRegister(this.boards[0], XADD + (RW - wh.w) / 2, (RH - wh.h) / 2);
                this.svgCanvas.SetGroupPositionValue(this.boards[0].pointGroupTag, XADD + (RW - wh.w) / 2, (RH - wh.h) / 2);
                this.AssignHandlerAndRegister(this.boards[1], XADD + (RW - wh2.w) / 2, (RH - wh2.h) / 2);
                this.svgCanvas.SetGroupPositionValue(this.boards[1].pointGroupTag, XADD + (RW - wh2.w) / 2, (RH - wh2.h) / 2);
                this.AssignHandlerAndRegister(this.boards[2], XADD + (RW - wh3.w) / 2, (RH - wh3.h) / 2);
                this.svgCanvas.SetGroupPositionValue(this.boards[2].pointGroupTag, XADD + (RW - wh3.w) / 2, (RH - wh3.h) / 2);
                this.svgCanvas.GetTag().appendChild(this.boards[0].groupTag);
                this.svgCanvas.GetTag().appendChild(this.boards[0].pointGroupTag);
                this.curBoard = this.boards[0];
            };
            Geoboard.prototype.DeleteChecker = function () {
                if (upred.ui.uiModule.selectedItems.length <= 1) {
                    if (upred.ui.uiModule.selectedItems[0].type
                        && upred.ui.uiModule.selectedItems[0].type == 'board')
                        return false;
                    else
                        return true;
                }
                return false;
            };
            Geoboard.prototype.Init = function () {
                var _a, _b, _c, _d, _e;
                (_a = upred.ui.uiModule) === null || _a === void 0 ? void 0 : _a.AddCustomPresetButton('boardRectWide', {
                    img: './asset/icon_board_rectwide.png',
                    txt: '직사각판',
                    handler: this.OnClickBoardRectWide.bind(this)
                });
                (_b = upred.ui.uiModule) === null || _b === void 0 ? void 0 : _b.AddCustomPresetButton('boardCircle', {
                    img: './asset/icon_board_circle.png',
                    txt: '원판',
                    handler: this.OnClickBoardCircle.bind(this)
                });
                (_c = upred.ui.uiModule) === null || _c === void 0 ? void 0 : _c.AddCustomPresetButton('boardRect', {
                    img: './asset/icon_board_rect.png',
                    txt: '정사각판',
                    handler: this.OnClickBoardRect.bind(this)
                });
                (_d = upred.ui.uiModule) === null || _d === void 0 ? void 0 : _d.DisableRotation();
                (_e = upred.ui.uiModule) === null || _e === void 0 ? void 0 : _e.DisableDuplication();
                this.InitPalette();
                this.InitBoards();
                this.OnClickBoardRect();
                upred.ui.GuideViewer.Show('./asset/guide.png');
            };
            return Geoboard;
        }());
        math.Geoboard = Geoboard;
    })(math = upred.math || (upred.math = {}));
})(upred || (upred = {}));
//# sourceMappingURL=geoboard.js.map