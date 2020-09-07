(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layouts-admin-layout-admin-layout-module"],{

/***/ "./node_modules/ngx-clipboard/__ivy_ngcc__/fesm5/ngx-clipboard.js":
/*!************************************************************************!*\
  !*** ./node_modules/ngx-clipboard/__ivy_ngcc__/fesm5/ngx-clipboard.js ***!
  \************************************************************************/
/*! exports provided: ClipboardDirective, ClipboardIfSupportedDirective, ClipboardModule, ClipboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardDirective", function() { return ClipboardDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardIfSupportedDirective", function() { return ClipboardIfSupportedDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardModule", function() { return ClipboardModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardService", function() { return ClipboardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var ngx_window_token__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-window-token */ "./node_modules/ngx-window-token/__ivy_ngcc__/fesm5/ngx-window-token.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");






/**
 * The following code is heavily copied from https://github.com/zenorocha/clipboard.js
 */

var ClipboardService = /** @class */ (function () {
    function ClipboardService(document, window) {
        this.document = document;
        this.window = window;
        this.copySubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.copyResponse$ = this.copySubject.asObservable();
        this.config = {};
    }
    ClipboardService.prototype.configure = function (config) {
        this.config = config;
    };
    ClipboardService.prototype.copy = function (content) {
        if (!this.isSupported || !content) {
            return this.pushCopyResponse({ isSuccess: false, content: content });
        }
        var copyResult = this.copyFromContent(content);
        if (copyResult) {
            return this.pushCopyResponse({ content: content, isSuccess: copyResult });
        }
        return this.pushCopyResponse({ isSuccess: false, content: content });
    };
    Object.defineProperty(ClipboardService.prototype, "isSupported", {
        get: function () {
            return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy') && !!this.window;
        },
        enumerable: true,
        configurable: true
    });
    ClipboardService.prototype.isTargetValid = function (element) {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (element.hasAttribute('disabled')) {
                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            }
            return true;
        }
        throw new Error('Target should be input or textarea');
    };
    /**
     * Attempts to copy from an input `targetElm`
     */
    ClipboardService.prototype.copyFromInputElement = function (targetElm, isFocus) {
        if (isFocus === void 0) { isFocus = true; }
        try {
            this.selectTarget(targetElm);
            var re = this.copyText();
            this.clearSelection(isFocus ? targetElm : undefined, this.window);
            return re && this.isCopySuccessInIE11();
        }
        catch (error) {
            return false;
        }
    };
    /**
     * This is a hack for IE11 to return `true` even if copy fails.
     */
    ClipboardService.prototype.isCopySuccessInIE11 = function () {
        var clipboardData = this.window['clipboardData'];
        if (clipboardData && clipboardData.getData) {
            if (!clipboardData.getData('Text')) {
                return false;
            }
        }
        return true;
    };
    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    ClipboardService.prototype.copyFromContent = function (content, container) {
        if (container === void 0) { container = this.document.body; }
        // check if the temp textarea still belongs to the current container.
        // In case we have multiple places using ngx-clipboard, one is in a modal using container but the other one is not.
        if (this.tempTextArea && !container.contains(this.tempTextArea)) {
            this.destroy(this.tempTextArea.parentElement);
        }
        if (!this.tempTextArea) {
            this.tempTextArea = this.createTempTextArea(this.document, this.window);
            try {
                container.appendChild(this.tempTextArea);
            }
            catch (error) {
                throw new Error('Container should be a Dom element');
            }
        }
        this.tempTextArea.value = content;
        var toReturn = this.copyFromInputElement(this.tempTextArea, false);
        if (this.config.cleanUpAfterCopy) {
            this.destroy(this.tempTextArea.parentElement);
        }
        return toReturn;
    };
    /**
     * Remove temporary textarea if any exists.
     */
    ClipboardService.prototype.destroy = function (container) {
        if (container === void 0) { container = this.document.body; }
        if (this.tempTextArea) {
            container.removeChild(this.tempTextArea);
            // removeChild doesn't remove the reference from memory
            this.tempTextArea = undefined;
        }
    };
    /**
     * Select the target html input element.
     */
    ClipboardService.prototype.selectTarget = function (inputElement) {
        inputElement.select();
        inputElement.setSelectionRange(0, inputElement.value.length);
        return inputElement.value.length;
    };
    ClipboardService.prototype.copyText = function () {
        return this.document.execCommand('copy');
    };
    /**
     * Moves focus away from `target` and back to the trigger, removes current selection.
     */
    ClipboardService.prototype.clearSelection = function (inputElement, window) {
        inputElement && inputElement.focus();
        window.getSelection().removeAllRanges();
    };
    /**
     * Creates a fake textarea for copy command.
     */
    ClipboardService.prototype.createTempTextArea = function (doc, window) {
        var isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
        var ta;
        ta = doc.createElement('textarea');
        // Prevent zooming on iOS
        ta.style.fontSize = '12pt';
        // Reset box model
        ta.style.border = '0';
        ta.style.padding = '0';
        ta.style.margin = '0';
        // Move element out of screen horizontally
        ta.style.position = 'absolute';
        ta.style[isRTL ? 'right' : 'left'] = '-9999px';
        // Move element to the same position vertically
        var yPosition = window.pageYOffset || doc.documentElement.scrollTop;
        ta.style.top = yPosition + 'px';
        ta.setAttribute('readonly', '');
        return ta;
    };
    /**
     * Pushes copy operation response to copySubject, to provide global access
     * to the response.
     */
    ClipboardService.prototype.pushCopyResponse = function (response) {
        this.copySubject.next(response);
    };
    /**
     * @deprecated use pushCopyResponse instead.
     */
    ClipboardService.prototype.pushCopyReponse = function (response) {
        this.pushCopyResponse(response);
    };
    ClipboardService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [ngx_window_token__WEBPACK_IMPORTED_MODULE_3__["WINDOW"],] }] }
    ]; };
    ClipboardService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"])({ factory: function ClipboardService_Factory() { return new ClipboardService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"])(ngx_window_token__WEBPACK_IMPORTED_MODULE_3__["WINDOW"], 8)); }, token: ClipboardService, providedIn: "root" });
    ClipboardService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([ Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"])), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(ngx_window_token__WEBPACK_IMPORTED_MODULE_3__["WINDOW"]))
    ], ClipboardService);
ClipboardService.ɵfac = function ClipboardService_Factory(t) { return new (t || ClipboardService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](ngx_window_token__WEBPACK_IMPORTED_MODULE_3__["WINDOW"], 8)); };
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](ClipboardService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [ngx_window_token__WEBPACK_IMPORTED_MODULE_3__["WINDOW"]]
            }] }]; }, null); })();
    return ClipboardService;
}());

var ClipboardDirective = /** @class */ (function () {
    function ClipboardDirective(clipboardSrv) {
        this.clipboardSrv = clipboardSrv;
        this.cbOnSuccess = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        this.cbOnError = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
    }
    // tslint:disable-next-line:no-empty
    ClipboardDirective.prototype.ngOnInit = function () { };
    ClipboardDirective.prototype.ngOnDestroy = function () {
        this.clipboardSrv.destroy(this.container);
    };
    ClipboardDirective.prototype.onClick = function (event) {
        if (!this.clipboardSrv.isSupported) {
            this.handleResult(false, undefined, event);
        }
        else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
            this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
        }
        else if (this.cbContent) {
            this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
        }
    };
    /**
     * Fires an event based on the copy operation result.
     * @param succeeded
     */
    ClipboardDirective.prototype.handleResult = function (succeeded, copiedContent, event) {
        var response = {
            isSuccess: succeeded,
            event: event
        };
        if (succeeded) {
            response = Object.assign(response, {
                content: copiedContent,
                successMessage: this.cbSuccessMsg
            });
            this.cbOnSuccess.emit(response);
        }
        else {
            this.cbOnError.emit(response);
        }
        this.clipboardSrv.pushCopyResponse(response);
    };
    ClipboardDirective.ctorParameters = function () { return [
        { type: ClipboardService }
    ]; };
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])('ngxClipboard')
    ], ClipboardDirective.prototype, "targetElm", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], ClipboardDirective.prototype, "container", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], ClipboardDirective.prototype, "cbContent", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])()
    ], ClipboardDirective.prototype, "cbSuccessMsg", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])()
    ], ClipboardDirective.prototype, "cbOnSuccess", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])()
    ], ClipboardDirective.prototype, "cbOnError", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["HostListener"])('click', ['$event.target'])
    ], ClipboardDirective.prototype, "onClick", null);
ClipboardDirective.ɵfac = function ClipboardDirective_Factory(t) { return new (t || ClipboardDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ClipboardService)); };
ClipboardDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({ type: ClipboardDirective, selectors: [["", "ngxClipboard", ""]], hostBindings: function ClipboardDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ClipboardDirective_click_HostBindingHandler($event) { return ctx.onClick($event.target); });
    } }, inputs: { targetElm: ["ngxClipboard", "targetElm"], container: "container", cbContent: "cbContent", cbSuccessMsg: "cbSuccessMsg" }, outputs: { cbOnSuccess: "cbOnSuccess", cbOnError: "cbOnError" } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](ClipboardDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"],
        args: [{
                selector: '[ngxClipboard]'
            }]
    }], function () { return [{ type: ClipboardService }]; }, { cbOnSuccess: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
        }], cbOnError: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
        }], onClick: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["HostListener"],
            args: ['click', ['$event.target']]
        }], targetElm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
            args: ['ngxClipboard']
        }], container: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], cbContent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], cbSuccessMsg: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }] }); })();
    return ClipboardDirective;
}());

var ClipboardIfSupportedDirective = /** @class */ (function () {
    function ClipboardIfSupportedDirective(_clipboardService, _viewContainerRef, _templateRef) {
        this._clipboardService = _clipboardService;
        this._viewContainerRef = _viewContainerRef;
        this._templateRef = _templateRef;
    }
    ClipboardIfSupportedDirective.prototype.ngOnInit = function () {
        if (this._clipboardService.isSupported) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
    };
    ClipboardIfSupportedDirective.ctorParameters = function () { return [
        { type: ClipboardService },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewContainerRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["TemplateRef"] }
    ]; };
ClipboardIfSupportedDirective.ɵfac = function ClipboardIfSupportedDirective_Factory(t) { return new (t || ClipboardIfSupportedDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ClipboardService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewContainerRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["TemplateRef"])); };
ClipboardIfSupportedDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({ type: ClipboardIfSupportedDirective, selectors: [["", "ngxClipboardIfSupported", ""]] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](ClipboardIfSupportedDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"],
        args: [{
                selector: '[ngxClipboardIfSupported]'
            }]
    }], function () { return [{ type: ClipboardService }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewContainerRef"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["TemplateRef"] }]; }, null); })();
    return ClipboardIfSupportedDirective;
}());

var ClipboardModule = /** @class */ (function () {
    function ClipboardModule() {
    }
ClipboardModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ClipboardModule });
ClipboardModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function ClipboardModule_Factory(t) { return new (t || ClipboardModule)(); }, imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ClipboardModule, { declarations: function () { return [ClipboardDirective,
        ClipboardIfSupportedDirective]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]]; }, exports: function () { return [ClipboardDirective,
        ClipboardIfSupportedDirective]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](ClipboardModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
                declarations: [ClipboardDirective, ClipboardIfSupportedDirective],
                exports: [ClipboardDirective, ClipboardIfSupportedDirective]
            }]
    }], function () { return []; }, null); })();
    return ClipboardModule;
}());

/*
 * Public API Surface of ngx-clipboard
 */

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=ngx-clipboard.js.map

/***/ }),

/***/ "./node_modules/ngx-window-token/__ivy_ngcc__/fesm5/ngx-window-token.js":
/*!******************************************************************************!*\
  !*** ./node_modules/ngx-window-token/__ivy_ngcc__/fesm5/ngx-window-token.js ***!
  \******************************************************************************/
/*! exports provided: WINDOW */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WINDOW", function() { return WINDOW; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");


var WINDOW = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('WindowToken', typeof window !== 'undefined' && window.document ? { providedIn: 'root', factory: function () { return window; } } : undefined);

/*
 * Public API Surface of ngx-window-token
 */

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=ngx-window-token.js.map

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/modal/modal.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/modal/modal.component.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template let-modal>\r\n    <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\" id=\"modal-basic-title\">Profile update</h4>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <form>\r\n            <div class=\"form-group\">\r\n                <label for=\"dateOfBirth\">Date of birth</label>\r\n                <div class=\"input-group\">\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"modal.close('Save click')\">Save</button>\r\n    </div>\r\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dashboard.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dashboard.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\" pb-8 pt-md-6\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"header-body\">\r\n      <!-- Card stats -->\r\n      <div class=\"row\">\r\n        <div class=\"mx-auto\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div *ngIf=\"isLoaded\" class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Random Trivia...</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\"\r\n                    [ngClass]=\"answerIsSelected && regenerateRandomQuestion()\">{{randomQuestion.question}}</span>\r\n                </div>\r\n              </div>\r\n              <div class=\"row mt-2\">\r\n                <div class=\"col\">\r\n                  <!-- <p class=\"mb-0 text-muted text-sm\">\r\n                    <span class=\"text-nowrap\">Answers/input down here maybe?</span>\r\n                  </p> -->\r\n                  <div *ngFor=\"let answer of answers; let i = index;\" class=\"btn-group btn-group-toggle w-50\"\r\n                    ngbRadioGroup name=\"radioBasic\" [(ngModel)]=\"model\" [ngClass]=\"answerIsSelected && [makeOpaque]\">\r\n                    <label ngbButtonLabel class=\"btn-primary btn-block m-1\" [ngClass]=\"answerIsSelected && [css[i]]\"\r\n                      [value]=\"[i]\" (click)=\"checkAnswer(i)\">\r\n                      {{answer.text}}\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n                <!-- <div class=\"ml-auto mr-3\">\r\n                  <button class=\"btn btn-sm btn-primary\">Submit</button>\r\n                </div> -->\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"container-fluid mt--7\">\r\n  <div class=\"row\">\r\n    <div class=\"col transforms mx-auto\" data-toggle=\"modal\" data-target=\"#joinQuizModal\"\r\n      (click)=\"openModal(joinQuizModal)\">\r\n      <div class=\"card card-height bg-gradient-success shadow clickable bleed\">\r\n        <h3 class=\"card-header bg-transparent mx-auto border-0 pt-7\">\r\n          <i class=\"fas fa-check-circle fa-3x\"></i>\r\n        </h3>\r\n        <div class=\"card-body\">\r\n          <p class=\"card-text text-center font-weight-bold\">\r\n            Join a quiz with an ID provided by the QuizMaster.\r\n          </p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"col transforms mx-auto\" data-toggle=\"modal\" data-target=\"#hostQuizModal\"\r\n      (click)=\"openModal(hostQuizModal)\">\r\n      <div class=\"card card-height bg-gradient-warning shadow clickable bleed\">\r\n        <h3 class=\"card-header bg-transparent mx-auto border-0 pt-7\">\r\n          <i class=\"fas fa-list-alt fa-3x\"></i>\r\n        </h3>\r\n        <div class=\"card-body\">\r\n          <p class=\"card-text text-center font-weight-bold\">\r\n            Host a quiz and play against your friends.\r\n          </p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- Todo: Componentise this -->\r\n  <ng-template #joinQuizModal let-modal>\r\n    <div class=\"modal-header\">\r\n      <h4 class=\"modal-title\" id=\"modal-basic-title\">Join a Quiz</h4>\r\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n        <span aria-hidden=\"true\">&times;</span>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <form>\r\n        <div class=\"form-group\">\r\n          <label for=\"quizId\">Enter the Quiz ID provided by the Quiz Master.</label>\r\n          <div class=\"input-group\">\r\n            <input #quizId type=\"text\" class=\"form-control\" placeholder=\"Quiz ID\" aria-label=\"Quiz ID\"\r\n              aria-describedby=\"basic-addon\">\r\n          </div>\r\n          <label for=\"quizId\">Enter your name.</label>\r\n          <div class=\"input-group\">\r\n            <input #username type=\"text\" class=\"form-control\" placeholder=\"Quiz ID\" aria-label=\"Quiz ID\"\r\n              aria-describedby=\"basic-addon\">\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button type=\"button\" class=\"btn btn-primary\"\r\n        (click)=\"joinQuiz(quizId.value, username.value, joinQuizModal)\">Join</button>\r\n    </div>\r\n  </ng-template>\r\n  <!-- Todo: Componentise this -->\r\n  <ng-template #hostQuizModal let-modal>\r\n    <div class=\"modal-header\">\r\n      <h4 class=\"modal-title\" id=\"modal-basic-title\">Host a Quiz</h4>\r\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n        <span aria-hidden=\"true\">&times;</span>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <form>\r\n        <div class=\"form-group\">\r\n          <label for=\"quizId\" class=\"p-1 border-bottom\">Host a quick-fire quiz with 10 questions. Time limit is 60\r\n            seconds.</label>\r\n          <br />\r\n          <div ngbDropdown class=\"d-inline-block\">\r\n            <label for=\"quizId\" class=\"p-1 border-bottom\">Difficulty</label>\r\n            <button class=\"btn btn-secondary\" id=\"dropdown\" ngbDropdownToggle>{{selectedDifficulty.value}}</button>\r\n            <div ngbDropdownMenu aria-labelledby=\"dropdown\">\r\n              <button ngbDropdownItem (click)=\"updateQuestionDifficulty(0)\">Any</button>\r\n              <button ngbDropdownItem (click)=\"updateQuestionDifficulty(1)\">Easy</button>\r\n              <button ngbDropdownItem (click)=\"updateQuestionDifficulty(2)\">Medium</button>\r\n              <button ngbDropdownItem (click)=\"updateQuestionDifficulty(3)\">Hard</button>\r\n            </div>\r\n            <br />\r\n            <label class=\"p-1 border-bottom\">Username</label>\r\n            <input #hostUsername />\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"hostQuiz(hostUsername.value)\">Create</button>\r\n    </div>\r\n  </ng-template>\r\n  <ng-template #showPartyModal let-modal>\r\n    <div class=\"modal-header\">\r\n      <h4 class=\"modal-title\" id=\"modal-basic-title\">Your Quiz ID is {{quizId}}</h4>\r\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n        <span aria-hidden=\"true\">&times;</span>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <form>\r\n        <div class=\"form-group\">\r\n          <label>Waiting for People to Join...</label>\r\n          <div *ngFor=\"let person of party;\">\r\n            {{person}}\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button *ngIf=\"userIsHost\" type=\"button\" class=\"btn btn-primary\"\r\n        (click)=\"startQuiz()\">Start Quiz</button>\r\n    </div>\r\n  </ng-template>\r\n</div>\r\n<!-- <div class=\"row mt-5\">\r\n    <div class=\"col-xl-8 mb-5 mb-xl-0\">\r\n      <div class=\"card shadow\">\r\n        <div class=\"card-header border-0\">\r\n          <div class=\"row align-items-center\">\r\n            <div class=\"col\">\r\n              <h3 class=\"mb-0\">Page visits</h3>\r\n            </div>\r\n            <div class=\"col text-right\">\r\n              <a href=\"#!\" class=\"btn btn-sm btn-primary\">See all</a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"table-responsive\">\r\n          <table class=\"table align-items-center table-flush\">\r\n            <thead class=\"thead-light\">\r\n              <tr>\r\n                <th scope=\"col\">Page name</th>\r\n                <th scope=\"col\">Visitors</th>\r\n                <th scope=\"col\">Unique users</th>\r\n                <th scope=\"col\">Bounce rate</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  /argon/\r\n                </th>\r\n                <td>\r\n                  4,569\r\n                </td>\r\n                <td>\r\n                  340\r\n                </td>\r\n                <td>\r\n                  <i class=\"fas fa-arrow-up text-success mr-3\"></i> 46,53%\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  /argon/index.html\r\n                </th>\r\n                <td>\r\n                  3,985\r\n                </td>\r\n                <td>\r\n                  319\r\n                </td>\r\n                <td>\r\n                  <i class=\"fas fa-arrow-down text-warning mr-3\"></i> 46,53%\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  /argon/charts.html\r\n                </th>\r\n                <td>\r\n                  3,513\r\n                </td>\r\n                <td>\r\n                  294\r\n                </td>\r\n                <td>\r\n                  <i class=\"fas fa-arrow-down text-warning mr-3\"></i> 36,49%\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  /argon/tables.html\r\n                </th>\r\n                <td>\r\n                  2,050\r\n                </td>\r\n                <td>\r\n                  147\r\n                </td>\r\n                <td>\r\n                  <i class=\"fas fa-arrow-up text-success mr-3\"></i> 50,87%\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  /argon/profile.html\r\n                </th>\r\n                <td>\r\n                  1,795\r\n                </td>\r\n                <td>\r\n                  190\r\n                </td>\r\n                <td>\r\n                  <i class=\"fas fa-arrow-down text-danger mr-3\"></i> 46,53%\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xl-4\">\r\n      <div class=\"card shadow\">\r\n        <div class=\"card-header border-0\">\r\n          <div class=\"row align-items-center\">\r\n            <div class=\"col\">\r\n              <h3 class=\"mb-0\">Social traffic</h3>\r\n            </div>\r\n            <div class=\"col text-right\">\r\n              <a href=\"#!\" class=\"btn btn-sm btn-primary\">See all</a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"table-responsive\">\r\n          <table class=\"table align-items-center table-flush\">\r\n            <thead class=\"thead-light\">\r\n              <tr>\r\n                <th scope=\"col\">Referral</th>\r\n                <th scope=\"col\">Visitors</th>\r\n                <th scope=\"col\"></th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  Facebook\r\n                </th>\r\n                <td>\r\n                  1,480\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">60%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-gradient-danger\" role=\"progressbar\" aria-valuenow=\"60\"\r\n                          aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 60%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  Facebook\r\n                </th>\r\n                <td>\r\n                  5,480\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">70%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-gradient-success\" role=\"progressbar\" aria-valuenow=\"70\"\r\n                          aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 70%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  Google\r\n                </th>\r\n                <td>\r\n                  4,807\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">80%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-gradient-primary\" role=\"progressbar\" aria-valuenow=\"80\"\r\n                          aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 80%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  Instagram\r\n                </th>\r\n                <td>\r\n                  3,678\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">75%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-gradient-info\" role=\"progressbar\" aria-valuenow=\"75\"\r\n                          aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 75%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  twitter\r\n                </th>\r\n                <td>\r\n                  2,645\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">30%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-gradient-warning\" role=\"progressbar\" aria-valuenow=\"30\"\r\n                          aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 30%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table> \r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div> -->");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/icons/icons.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/icons/icons.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header bg-gradient-danger pb-8 pt-5 pt-md-8\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"header-body\">\r\n      <!-- Card stats -->\r\n      <div class=\"row\">\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Traffic</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">350,897</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-danger text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-chart-bar\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-success mr-2\"><i class=\"fa fa-arrow-up\"></i> 3.48%</span>\r\n                <span class=\"text-nowrap\">Since last month</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">New users</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">2,356</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-warning text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-chart-pie\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-danger mr-2\"><i class=\"fas fa-arrow-down\"></i> 3.48%</span>\r\n                <span class=\"text-nowrap\">Since last week</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Sales</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">924</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-yellow text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-users\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-warning mr-2\"><i class=\"fas fa-arrow-down\"></i> 1.10%</span>\r\n                <span class=\"text-nowrap\">Since yesterday</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Performance</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">49,65%</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-info text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-percent\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-success mr-2\"><i class=\"fas fa-arrow-up\"></i> 12%</span>\r\n                <span class=\"text-nowrap\">Since last month</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!-- Page content -->\r\n<div class=\"container-fluid mt--7\">\r\n  <!-- Table -->\r\n  <div class=\"row\">\r\n    <div class=\"col\">\r\n      <div class=\"card shadow\">\r\n        <div class=\"card-header bg-transparent\">\r\n          <h3 class=\"mb-0\">Icons</h3>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"row icon-examples\">\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'active-40' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'active-40'\" (cbOnSuccess) = \"copy = 'active-40'\">\r\n                <div>\r\n                  <i class=\"ni ni-active-40\"></i>\r\n                  <span>active-40</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'air-baloon' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'air-baloon'\" (cbOnSuccess) = \"copy = 'air-baloon'\">\r\n                <div>\r\n                  <i class=\"ni ni-air-baloon\"></i>\r\n                  <span>air-baloon</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'album-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'album-2'\" (cbOnSuccess) = \"copy = 'album-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-album-2\"></i>\r\n                  <span>album-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'align-center' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'align-center'\" (cbOnSuccess) = \"copy = 'align-center'\">\r\n                <div>\r\n                  <i class=\"ni ni-align-center\"></i>\r\n                  <span>align-center</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'align-left-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'align-left-2'\" (cbOnSuccess) = \"copy = 'align-left-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-align-left-2\"></i>\r\n                  <span>align-left-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'ambulance' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'ambulance'\" (cbOnSuccess) = \"copy = 'ambulance'\">\r\n                <div>\r\n                  <i class=\"ni ni-ambulance\"></i>\r\n                  <span>ambulance</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'app' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'app'\" (cbOnSuccess) = \"copy = 'app'\">\r\n                <div>\r\n                  <i class=\"ni ni-app\"></i>\r\n                  <span>app</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'archive-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'archive-2'\" (cbOnSuccess) = \"copy = 'archive-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-archive-2\"></i>\r\n                  <span>archive-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'atom' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'atom'\" (cbOnSuccess) = \"copy = 'atom'\">\r\n                <div>\r\n                  <i class=\"ni ni-atom\"></i>\r\n                  <span>atom</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'badge' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'badge'\" (cbOnSuccess) = \"copy = 'badge'\">\r\n                <div>\r\n                  <i class=\"ni ni-badge\"></i>\r\n                  <span>badge</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bag-17' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bag-17'\" (cbOnSuccess) = \"copy = 'bag-17'\">\r\n                <div>\r\n                  <i class=\"ni ni-bag-17\"></i>\r\n                  <span>bag-17</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'basket' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'basket'\" (cbOnSuccess) = \"copy = 'basket'\">\r\n                <div>\r\n                  <i class=\"ni ni-basket\"></i>\r\n                  <span>basket</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bell-55' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bell-55'\" (cbOnSuccess) = \"copy = 'bell-55'\">\r\n                <div>\r\n                  <i class=\"ni ni-bell-55\"></i>\r\n                  <span>bell-55</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bold-down' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bold-down'\" (cbOnSuccess) = \"copy = 'bold-down'\">\r\n                <div>\r\n                  <i class=\"ni ni-bold-down\"></i>\r\n                  <span>bold-down</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bold-left' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bold-left'\" (cbOnSuccess) = \"copy = 'bold-left'\">\r\n                <div>\r\n                  <i class=\"ni ni-bold-left\"></i>\r\n                  <span>bold-left</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bold-right' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bold-right'\" (cbOnSuccess) = \"copy = 'bold-right'\">\r\n                <div>\r\n                  <i class=\"ni ni-bold-right\"></i>\r\n                  <span>bold-right</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bold-up' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bold-up'\" (cbOnSuccess) = \"copy = 'bold-up'\">\r\n                <div>\r\n                  <i class=\"ni ni-bold-up\"></i>\r\n                  <span>bold-up</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bold' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bold'\" (cbOnSuccess) = \"copy = 'bold'\">\r\n                <div>\r\n                  <i class=\"ni ni-bold\"></i>\r\n                  <span>bold</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'book-bookmark' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'book-bookmark'\" (cbOnSuccess) = \"copy = 'book-bookmark'\">\r\n                <div>\r\n                  <i class=\"ni ni-book-bookmark\"></i>\r\n                  <span>book-bookmark</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'books' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'books'\" (cbOnSuccess) = \"copy = 'books'\">\r\n                <div>\r\n                  <i class=\"ni ni-books\"></i>\r\n                  <span>books</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'box-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'box-2'\" (cbOnSuccess) = \"copy = 'box-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-box-2\"></i>\r\n                  <span>box-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'briefcase-24' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'briefcase-24'\" (cbOnSuccess) = \"copy = 'briefcase-24'\">\r\n                <div>\r\n                  <i class=\"ni ni-briefcase-24\"></i>\r\n                  <span>briefcase-24</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'building' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'building'\" (cbOnSuccess) = \"copy = 'building'\">\r\n                <div>\r\n                  <i class=\"ni ni-building\"></i>\r\n                  <span>building</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bulb-61' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bulb-61'\" (cbOnSuccess) = \"copy = 'bulb-61'\">\r\n                <div>\r\n                  <i class=\"ni ni-bulb-61\"></i>\r\n                  <span>bulb-61</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bullet-list-67' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bullet-list-67'\" (cbOnSuccess) = \"copy = 'bullet-list-67'\">\r\n                <div>\r\n                  <i class=\"ni ni-bullet-list-67\"></i>\r\n                  <span>bullet-list-67</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'bus-front-12' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'bus-front-12'\" (cbOnSuccess) = \"copy = 'bus-front-12'\">\r\n                <div>\r\n                  <i class=\"ni ni-bus-front-12\"></i>\r\n                  <span>bus-front-12</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'button-pause' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'button-pause'\" (cbOnSuccess) = \"copy = 'button-pause'\">\r\n                <div>\r\n                  <i class=\"ni ni-button-pause\"></i>\r\n                  <span>button-pause</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'button-play' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'button-play'\" (cbOnSuccess) = \"copy = 'button-play'\">\r\n                <div>\r\n                  <i class=\"ni ni-button-play\"></i>\r\n                  <span>button-play</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'button-power' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'button-power'\" (cbOnSuccess) = \"copy = 'button-power'\">\r\n                <div>\r\n                  <i class=\"ni ni-button-power\"></i>\r\n                  <span>button-power</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'calendar-grid-58' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'calendar-grid-58'\" (cbOnSuccess) = \"copy = 'calendar-grid-58'\">\r\n                <div>\r\n                  <i class=\"ni ni-calendar-grid-58\"></i>\r\n                  <span>calendar-grid-58</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'camera-compact' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'camera-compact'\" (cbOnSuccess) = \"copy = 'camera-compact'\">\r\n                <div>\r\n                  <i class=\"ni ni-camera-compact\"></i>\r\n                  <span>camera-compact</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'caps-small' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'caps-small'\" (cbOnSuccess) = \"copy = 'caps-small'\">\r\n                <div>\r\n                  <i class=\"ni ni-caps-small\"></i>\r\n                  <span>caps-small</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'cart' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'cart'\" (cbOnSuccess) = \"copy = 'cart'\">\r\n                <div>\r\n                  <i class=\"ni ni-cart\"></i>\r\n                  <span>cart</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'chart-bar-32' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'chart-bar-32'\" (cbOnSuccess) = \"copy = 'chart-bar-32'\">\r\n                <div>\r\n                  <i class=\"ni ni-chart-bar-32\"></i>\r\n                  <span>chart-bar-32</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'chart-pie-35' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'chart-pie-35'\" (cbOnSuccess) = \"copy = 'chart-pie-35'\">\r\n                <div>\r\n                  <i class=\"ni ni-chart-pie-35\"></i>\r\n                  <span>chart-pie-35</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'chat-round' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'chat-round'\" (cbOnSuccess) = \"copy = 'chat-round'\">\r\n                <div>\r\n                  <i class=\"ni ni-chat-round\"></i>\r\n                  <span>chat-round</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'check-bold' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'check-bold'\" (cbOnSuccess) = \"copy = 'check-bold'\">\r\n                <div>\r\n                  <i class=\"ni ni-check-bold\"></i>\r\n                  <span>check-bold</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'circle-08' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'circle-08'\" (cbOnSuccess) = \"copy = 'circle-08'\">\r\n                <div>\r\n                  <i class=\"ni ni-circle-08\"></i>\r\n                  <span>circle-08</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'cloud-download-95' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'cloud-download-95'\" (cbOnSuccess) = \"copy = 'cloud-download-95'\">\r\n                <div>\r\n                  <i class=\"ni ni-cloud-download-95\"></i>\r\n                  <span>cloud-download-95</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'cloud-upload-96' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'cloud-upload-96'\" (cbOnSuccess) = \"copy = 'cloud-upload-96'\">\r\n                <div>\r\n                  <i class=\"ni ni-cloud-upload-96\"></i>\r\n                  <span>cloud-upload-96</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'compass-04' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'compass-04'\" (cbOnSuccess) = \"copy = 'compass-04'\">\r\n                <div>\r\n                  <i class=\"ni ni-compass-04\"></i>\r\n                  <span>compass-04</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'controller' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'controller'\" (cbOnSuccess) = \"copy = 'controller'\">\r\n                <div>\r\n                  <i class=\"ni ni-controller\"></i>\r\n                  <span>controller</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'credit-card' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'credit-card'\" (cbOnSuccess) = \"copy = 'credit-card'\">\r\n                <div>\r\n                  <i class=\"ni ni-credit-card\"></i>\r\n                  <span>credit-card</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'curved-next' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'curved-next'\" (cbOnSuccess) = \"copy = 'curved-next'\">\r\n                <div>\r\n                  <i class=\"ni ni-curved-next\"></i>\r\n                  <span>curved-next</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'delivery-fast' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'delivery-fast'\" (cbOnSuccess) = \"copy = 'delivery-fast'\">\r\n                <div>\r\n                  <i class=\"ni ni-delivery-fast\"></i>\r\n                  <span>delivery-fast</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'diamond' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'diamond'\" (cbOnSuccess) = \"copy = 'diamond'\">\r\n                <div>\r\n                  <i class=\"ni ni-diamond\"></i>\r\n                  <span>diamond</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'email-83' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'email-83'\" (cbOnSuccess) = \"copy = 'email-83'\">\r\n                <div>\r\n                  <i class=\"ni ni-email-83\"></i>\r\n                  <span>email-83</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'fat-add' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'fat-add'\" (cbOnSuccess) = \"copy = 'fat-add'\">\r\n                <div>\r\n                  <i class=\"ni ni-fat-add\"></i>\r\n                  <span>fat-add</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'fat-delete' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'fat-delete'\" (cbOnSuccess) = \"copy = 'fat-delete'\">\r\n                <div>\r\n                  <i class=\"ni ni-fat-delete\"></i>\r\n                  <span>fat-delete</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'fat-remove' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'fat-remove'\" (cbOnSuccess) = \"copy = 'fat-remove'\">\r\n                <div>\r\n                  <i class=\"ni ni-fat-remove\"></i>\r\n                  <span>fat-remove</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'favourite-28' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'favourite-28'\" (cbOnSuccess) = \"copy = 'favourite-28'\">\r\n                <div>\r\n                  <i class=\"ni ni-favourite-28\"></i>\r\n                  <span>favourite-28</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'folder-17' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'folder-17'\" (cbOnSuccess) = \"copy = 'folder-17'\">\r\n                <div>\r\n                  <i class=\"ni ni-folder-17\"></i>\r\n                  <span>folder-17</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'glasses-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'glasses-2'\" (cbOnSuccess) = \"copy = 'glasses-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-glasses-2\"></i>\r\n                  <span>glasses-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'hat-3' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'hat-3'\" (cbOnSuccess) = \"copy = 'hat-3'\">\r\n                <div>\r\n                  <i class=\"ni ni-hat-3\"></i>\r\n                  <span>hat-3</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'headphones' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'headphones'\" (cbOnSuccess) = \"copy = 'headphones'\">\r\n                <div>\r\n                  <i class=\"ni ni-headphones\"></i>\r\n                  <span>headphones</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'html5' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'html5'\" (cbOnSuccess) = \"copy = 'html5'\">\r\n                <div>\r\n                  <i class=\"ni ni-html5\"></i>\r\n                  <span>html5</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'istanbul' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'istanbul'\" (cbOnSuccess) = \"copy = 'istanbul'\">\r\n                <div>\r\n                  <i class=\"ni ni-istanbul\"></i>\r\n                  <span>istanbul</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'circle-08' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'circle-08'\" (cbOnSuccess) = \"copy = 'circle-08'\">\r\n                <div>\r\n                  <i class=\"ni ni-circle-08\"></i>\r\n                  <span>circle-08</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'key-25' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'key-25'\" (cbOnSuccess) = \"copy = 'key-25'\">\r\n                <div>\r\n                  <i class=\"ni ni-key-25\"></i>\r\n                  <span>key-25</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'laptop' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'laptop'\" (cbOnSuccess) = \"copy = 'laptop'\">\r\n                <div>\r\n                  <i class=\"ni ni-laptop\"></i>\r\n                  <span>laptop</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'like-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'like-2'\" (cbOnSuccess) = \"copy = 'like-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-like-2\"></i>\r\n                  <span>like-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'lock-circle-open' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'lock-circle-open'\" (cbOnSuccess) = \"copy = 'lock-circle-open'\">\r\n                <div>\r\n                  <i class=\"ni ni-lock-circle-open\"></i>\r\n                  <span>lock-circle-open</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'map-big' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'map-big'\" (cbOnSuccess) = \"copy = 'map-big'\">\r\n                <div>\r\n                  <i class=\"ni ni-map-big\"></i>\r\n                  <span>map-big</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'mobile-button' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'mobile-button'\" (cbOnSuccess) = \"copy = 'mobile-button'\">\r\n                <div>\r\n                  <i class=\"ni ni-mobile-button\"></i>\r\n                  <span>mobile-button</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'money-coins' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'money-coins'\" (cbOnSuccess) = \"copy = 'money-coins'\">\r\n                <div>\r\n                  <i class=\"ni ni-money-coins\"></i>\r\n                  <span>money-coins</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'note-03' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'note-03'\" (cbOnSuccess) = \"copy = 'note-03'\">\r\n                <div>\r\n                  <i class=\"ni ni-note-03\"></i>\r\n                  <span>note-03</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'notification-70' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'notification-70'\" (cbOnSuccess) = \"copy = 'notification-70'\">\r\n                <div>\r\n                  <i class=\"ni ni-notification-70\"></i>\r\n                  <span>notification-70</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'palette' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'palette'\" (cbOnSuccess) = \"copy = 'palette'\">\r\n                <div>\r\n                  <i class=\"ni ni-palette\"></i>\r\n                  <span>palette</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'paper-diploma' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'paper-diploma'\" (cbOnSuccess) = \"copy = 'paper-diploma'\">\r\n                <div>\r\n                  <i class=\"ni ni-paper-diploma\"></i>\r\n                  <span>paper-diploma</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'pin-3' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'pin-3'\" (cbOnSuccess) = \"copy = 'pin-3'\">\r\n                <div>\r\n                  <i class=\"ni ni-pin-3\"></i>\r\n                  <span>pin-3</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'planet' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'planet'\" (cbOnSuccess) = \"copy = 'planet'\">\r\n                <div>\r\n                  <i class=\"ni ni-planet\"></i>\r\n                  <span>planet</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'ruler-pencil' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'ruler-pencil'\" (cbOnSuccess) = \"copy = 'ruler-pencil'\">\r\n                <div>\r\n                  <i class=\"ni ni-ruler-pencil\"></i>\r\n                  <span>ruler-pencil</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'satisfied' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'satisfied'\" (cbOnSuccess) = \"copy = 'satisfied'\">\r\n                <div>\r\n                  <i class=\"ni ni-satisfied\"></i>\r\n                  <span>satisfied</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'scissors' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'scissors'\" (cbOnSuccess) = \"copy = 'scissors'\">\r\n                <div>\r\n                  <i class=\"ni ni-scissors\"></i>\r\n                  <span>scissors</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'send' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'send'\" (cbOnSuccess) = \"copy = 'send'\">\r\n                <div>\r\n                  <i class=\"ni ni-send\"></i>\r\n                  <span>send</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'settings-gear-65' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'settings-gear-65'\" (cbOnSuccess) = \"copy = 'settings-gear-65'\">\r\n                <div>\r\n                  <i class=\"ni ni-settings-gear-65\"></i>\r\n                  <span>settings-gear-65</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'settings' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'settings'\" (cbOnSuccess) = \"copy = 'settings'\">\r\n                <div>\r\n                  <i class=\"ni ni-settings\"></i>\r\n                  <span>settings</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'single-02' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'single-02'\" (cbOnSuccess) = \"copy = 'single-02'\">\r\n                <div>\r\n                  <i class=\"ni ni-single-02\"></i>\r\n                  <span>single-02</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'single-copy-04' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'single-copy-04'\" (cbOnSuccess) = \"copy = 'single-copy-04'\">\r\n                <div>\r\n                  <i class=\"ni ni-single-copy-04\"></i>\r\n                  <span>single-copy-04</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'sound-wave' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'sound-wave'\" (cbOnSuccess) = \"copy = 'sound-wave'\">\r\n                <div>\r\n                  <i class=\"ni ni-sound-wave\"></i>\r\n                  <span>sound-wave</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'spaceship' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'spaceship'\" (cbOnSuccess) = \"copy = 'spaceship'\">\r\n                <div>\r\n                  <i class=\"ni ni-spaceship\"></i>\r\n                  <span>spaceship</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'square-pin' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'square-pin'\" (cbOnSuccess) = \"copy = 'square-pin'\">\r\n                <div>\r\n                  <i class=\"ni ni-square-pin\"></i>\r\n                  <span>square-pin</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'support-16' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'support-16'\" (cbOnSuccess) = \"copy = 'support-16'\">\r\n                <div>\r\n                  <i class=\"ni ni-support-16\"></i>\r\n                  <span>support-16</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'tablet-button' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'tablet-button'\" (cbOnSuccess) = \"copy = 'tablet-button'\">\r\n                <div>\r\n                  <i class=\"ni ni-tablet-button\"></i>\r\n                  <span>tablet-button</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'tag' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'tag'\" (cbOnSuccess) = \"copy = 'tag'\">\r\n                <div>\r\n                  <i class=\"ni ni-tag\"></i>\r\n                  <span>tag</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'tie-bow' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'tie-bow'\" (cbOnSuccess) = \"copy = 'tie-bow'\">\r\n                <div>\r\n                  <i class=\"ni ni-tie-bow\"></i>\r\n                  <span>tie-bow</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'time-alarm' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'time-alarm'\" (cbOnSuccess) = \"copy = 'time-alarm'\">\r\n                <div>\r\n                  <i class=\"ni ni-time-alarm\"></i>\r\n                  <span>time-alarm</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'trophy' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'trophy'\" (cbOnSuccess) = \"copy = 'trophy'\">\r\n                <div>\r\n                  <i class=\"ni ni-trophy\"></i>\r\n                  <span>trophy</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'tv-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'tv-2'\" (cbOnSuccess) = \"copy = 'tv-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-tv-2\"></i>\r\n                  <span>tv-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'umbrella-13' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'umbrella-13'\" (cbOnSuccess) = \"copy = 'umbrella-13'\">\r\n                <div>\r\n                  <i class=\"ni ni-umbrella-13\"></i>\r\n                  <span>umbrella-13</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'user-run' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'user-run'\" (cbOnSuccess) = \"copy = 'user-run'\">\r\n                <div>\r\n                  <i class=\"ni ni-user-run\"></i>\r\n                  <span>user-run</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'vector' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'vector'\" (cbOnSuccess) = \"copy = 'vector'\">\r\n                <div>\r\n                  <i class=\"ni ni-vector\"></i>\r\n                  <span>vector</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'watch-time' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'watch-time'\" (cbOnSuccess) = \"copy = 'watch-time'\">\r\n                <div>\r\n                  <i class=\"ni ni-watch-time\"></i>\r\n                  <span>watch-time</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'world' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'world'\" (cbOnSuccess) = \"copy = 'world'\">\r\n                <div>\r\n                  <i class=\"ni ni-world\"></i>\r\n                  <span>world</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'zoom-split-in' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'zoom-split-in'\" (cbOnSuccess) = \"copy = 'zoom-split-in'\">\r\n                <div>\r\n                  <i class=\"ni ni-zoom-split-in\"></i>\r\n                  <span>zoom-split-in</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'collection' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'collection'\" (cbOnSuccess) = \"copy = 'collection'\">\r\n                <div>\r\n                  <i class=\"ni ni-collection\"></i>\r\n                  <span>collection</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'image' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'image'\" (cbOnSuccess) = \"copy = 'image'\">\r\n                <div>\r\n                  <i class=\"ni ni-image\"></i>\r\n                  <span>image</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'shop' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'shop'\" (cbOnSuccess) = \"copy = 'shop'\">\r\n                <div>\r\n                  <i class=\"ni ni-shop\"></i>\r\n                  <span>shop</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'ungroup' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'ungroup'\" (cbOnSuccess) = \"copy = 'ungroup'\">\r\n                <div>\r\n                  <i class=\"ni ni-ungroup\"></i>\r\n                  <span>ungroup</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'world-2' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'world-2'\" (cbOnSuccess) = \"copy = 'world-2'\">\r\n                <div>\r\n                  <i class=\"ni ni-world-2\"></i>\r\n                  <span>world-2</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n            <div class=\"col-lg-3 col-md-6\">\r\n              <button type=\"button\" placement=\"top-center\" triggers=\"hover focus click\" ngbTooltip=\"{{copy === 'ui-04' ? 'Copied':'Copy to clipboard'}}\"  class=\"btn-icon-clipboard\" ngxClipboard [cbContent]=\"'ui-04'\" (cbOnSuccess) = \"copy = 'ui-04'\">\r\n                <div>\r\n                  <i class=\"ni ni-ui-04\"></i>\r\n                  <span>ui-04</span>\r\n                </div>\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/maps/maps.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/maps/maps.component.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header bg-gradient-danger pb-8 pt-5 pt-md-8\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"header-body\">\r\n      <!-- Card stats -->\r\n      <div class=\"row\">\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Traffic</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">350,897</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-danger text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-chart-bar\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-success mr-2\"><i class=\"fa fa-arrow-up\"></i> 3.48%</span>\r\n                <span class=\"text-nowrap\">Since last month</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">New users</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">2,356</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-warning text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-chart-pie\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-danger mr-2\"><i class=\"fas fa-arrow-down\"></i> 3.48%</span>\r\n                <span class=\"text-nowrap\">Since last week</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Sales</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">924</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-yellow text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-users\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-warning mr-2\"><i class=\"fas fa-arrow-down\"></i> 1.10%</span>\r\n                <span class=\"text-nowrap\">Since yesterday</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Performance</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">49,65%</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-info text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-percent\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-success mr-2\"><i class=\"fas fa-arrow-up\"></i> 12%</span>\r\n                <span class=\"text-nowrap\">Since last month</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!-- Page content -->\r\n<div class=\"container-fluid mt--7\">\r\n  <div class=\"row\">\r\n    <div class=\"col\">\r\n      <div class=\"card shadow border-0\">\r\n        <div id=\"map-canvas\" class=\"map-canvas\" data-lat=\"40.748817\" data-lng=\"-73.985428\" style=\"height: 600px;\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/tables/tables.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/tables/tables.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header bg-gradient-danger pb-8 pt-5 pt-md-8\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"header-body\">\r\n      <!-- Card stats -->\r\n      <div class=\"row\">\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Traffic</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">350,897</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-danger text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-chart-bar\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-success mr-2\"><i class=\"fa fa-arrow-up\"></i> 3.48%</span>\r\n                <span class=\"text-nowrap\">Since last month</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">New users</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">2,356</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-warning text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-chart-pie\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-danger mr-2\"><i class=\"fas fa-arrow-down\"></i> 3.48%</span>\r\n                <span class=\"text-nowrap\">Since last week</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Sales</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">924</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-yellow text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-users\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-warning mr-2\"><i class=\"fas fa-arrow-down\"></i> 1.10%</span>\r\n                <span class=\"text-nowrap\">Since yesterday</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-lg-6\">\r\n          <div class=\"card card-stats mb-4 mb-xl-0\">\r\n            <div class=\"card-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Performance</h5>\r\n                  <span class=\"h2 font-weight-bold mb-0\">49,65%</span>\r\n                </div>\r\n                <div class=\"col-auto\">\r\n                  <div class=\"icon icon-shape bg-info text-white rounded-circle shadow\">\r\n                    <i class=\"fas fa-percent\"></i>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <p class=\"mt-3 mb-0 text-muted text-sm\">\r\n                <span class=\"text-success mr-2\"><i class=\"fas fa-arrow-up\"></i> 12%</span>\r\n                <span class=\"text-nowrap\">Since last month</span>\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!-- Page content -->\r\n<div class=\"container-fluid mt--7\">\r\n  <!-- Table -->\r\n  <div class=\"row\">\r\n    <div class=\"col\">\r\n      <div class=\"card shadow\">\r\n        <div class=\"card-header border-0\">\r\n          <h3 class=\"mb-0\">Card tables</h3>\r\n        </div>\r\n        <div class=\"table-responsive\">\r\n          <table class=\"table align-items-center table-flush\">\r\n            <thead class=\"thead-light\">\r\n              <tr>\r\n                <th scope=\"col\">Project</th>\r\n                <th scope=\"col\">Budget</th>\r\n                <th scope=\"col\">Status</th>\r\n                <th scope=\"col\">Users</th>\r\n                <th scope=\"col\">Completion</th>\r\n                <th scope=\"col\"></th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  <div class=\"media align-items-center\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar rounded-circle mr-3\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/bootstrap.jpg\">\r\n                    </a>\r\n                    <div class=\"media-body\">\r\n                      <span class=\"mb-0 text-sm\">Argon Design System</span>\r\n                    </div>\r\n                  </div>\r\n                </th>\r\n                <td>\r\n                  $2,500 USD\r\n                </td>\r\n                <td>\r\n                  <span class=\"badge badge-dot mr-4\">\r\n                    <i class=\"bg-warning\"></i> pending\r\n                  </span>\r\n                </td>\r\n                <td>\r\n                  <div class=\"avatar-group\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Ryan Tompson\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-1-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Romina Hadid\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-2-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Alexander Smith\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-3-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Jessica Doe\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-4-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">60%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-warning\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 60%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-right\">\r\n                  <div ngbDropdown placement=\"bottom-right\">\r\n                    <a class=\"btn btn-sm btn-icon-only text-light\"  ngbDropdownToggle>\r\n                      <i class=\"fas fa-ellipsis-v\"></i>\r\n                    </a>\r\n                    <div ngbDropdownMenu class=\" dropdown-menu-right dropdown-menu-arrow\">\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Something else here</a>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  <div class=\"media align-items-center\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar rounded-circle mr-3\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/angular.jpg\">\r\n                    </a>\r\n                    <div class=\"media-body\">\r\n                      <span class=\"mb-0 text-sm\">Angular Now UI Kit PRO</span>\r\n                    </div>\r\n                  </div>\r\n                </th>\r\n                <td>\r\n                  $1,800 USD\r\n                </td>\r\n                <td>\r\n                  <span class=\"badge badge-dot\">\r\n                    <i class=\"bg-success\"></i> completed\r\n                  </span>\r\n                </td>\r\n                <td>\r\n                  <div class=\"avatar-group\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Ryan Tompson\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-1-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Romina Hadid\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-2-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Alexander Smith\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-3-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Jessica Doe\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-4-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">100%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-success\" role=\"progressbar\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-right\">\r\n                  <div ngbDropdown  placement=\"bottom-right\">\r\n                    <a class=\"btn btn-sm btn-icon-only text-light\"  ngbDropdownToggle>\r\n                      <i class=\"fas fa-ellipsis-v\"></i>\r\n                    </a>\r\n                    <div ngbDropdownMenu class=\" dropdown-menu-right dropdown-menu-arrow\">\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Something else here</a>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  <div class=\"media align-items-center\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar rounded-circle mr-3\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/sketch.jpg\">\r\n                    </a>\r\n                    <div class=\"media-body\">\r\n                      <span class=\"mb-0 text-sm\">Black Dashboard</span>\r\n                    </div>\r\n                  </div>\r\n                </th>\r\n                <td>\r\n                  $3,150 USD\r\n                </td>\r\n                <td>\r\n                  <span class=\"badge badge-dot mr-4\">\r\n                    <i class=\"bg-danger\"></i> delayed\r\n                  </span>\r\n                </td>\r\n                <td>\r\n                  <div class=\"avatar-group\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Ryan Tompson\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-1-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Romina Hadid\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-2-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Alexander Smith\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-3-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Jessica Doe\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-4-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">72%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-danger\" role=\"progressbar\" aria-valuenow=\"72\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 72%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-right\">\r\n                  <div ngbDropdown  placement=\"top-right\">\r\n                    <a class=\"btn btn-sm btn-icon-only text-light\"  ngbDropdownToggle>\r\n                      <i class=\"fas fa-ellipsis-v\"></i>\r\n                    </a>\r\n                    <div ngbDropdownMenu class=\" dropdown-menu-right dropdown-menu-arrow\">\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Something else here</a>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  <div class=\"media align-items-center\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar rounded-circle mr-3\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/react.jpg\">\r\n                    </a>\r\n                    <div class=\"media-body\">\r\n                      <span class=\"mb-0 text-sm\">React Material Dashboard</span>\r\n                    </div>\r\n                  </div>\r\n                </th>\r\n                <td>\r\n                  $4,400 USD\r\n                </td>\r\n                <td>\r\n                  <span class=\"badge badge-dot\">\r\n                    <i class=\"bg-info\"></i> on schedule\r\n                  </span>\r\n                </td>\r\n                <td>\r\n                  <div class=\"avatar-group\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Ryan Tompson\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-1-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Romina Hadid\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-2-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Alexander Smith\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-3-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Jessica Doe\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-4-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">90%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-info\" role=\"progressbar\" aria-valuenow=\"90\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 90%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-right\">\r\n                  <div ngbDropdown   placement=\"top-right\">\r\n                    <a class=\"btn btn-sm btn-icon-only text-light\"  ngbDropdownToggle>\r\n                      <i class=\"fas fa-ellipsis-v\"></i>\r\n                    </a>\r\n                    <div ngbDropdownMenu class=\" dropdown-menu-right dropdown-menu-arrow\">\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Something else here</a>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  <div class=\"media align-items-center\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar rounded-circle mr-3\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/vue.jpg\">\r\n                    </a>\r\n                    <div class=\"media-body\">\r\n                      <span class=\"mb-0 text-sm\">Vue Paper UI Kit PRO</span>\r\n                    </div>\r\n                  </div>\r\n                </th>\r\n                <td>\r\n                  $2,200 USD\r\n                </td>\r\n                <td>\r\n                  <span class=\"badge badge-dot mr-4\">\r\n                    <i class=\"bg-success\"></i> completed\r\n                  </span>\r\n                </td>\r\n                <td>\r\n                  <div class=\"avatar-group\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Ryan Tompson\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-1-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Romina Hadid\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-2-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Alexander Smith\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-3-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Jessica Doe\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-4-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">100%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-success\" role=\"progressbar\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-right\">\r\n                  <div ngbDropdown   placement=\"top-right\">\r\n                    <a class=\"btn btn-sm btn-icon-only text-light\"  ngbDropdownToggle>\r\n                      <i class=\"fas fa-ellipsis-v\"></i>\r\n                    </a>\r\n                    <div ngbDropdownMenu class=\" dropdown-menu-right dropdown-menu-arrow\">\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Something else here</a>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n        <div class=\"card-footer py-4\">\r\n          <nav aria-label=\"...\">\r\n            <ul class=\"pagination justify-content-end mb-0\">\r\n              <li class=\"page-item disabled\">\r\n                <a class=\"page-link\" href=\"javascript:void(0)\" tabindex=\"-1\">\r\n                  <i class=\"fas fa-angle-left\"></i>\r\n                  <span class=\"sr-only\">Previous</span>\r\n                </a>\r\n              </li>\r\n              <li class=\"page-item active\">\r\n                <a class=\"page-link\" href=\"javascript:void(0)\">1</a>\r\n              </li>\r\n              <li class=\"page-item\">\r\n                <a class=\"page-link\" href=\"javascript:void(0)\">2 <span class=\"sr-only\">(current)</span></a>\r\n              </li>\r\n              <li class=\"page-item\"><a class=\"page-link\" href=\"javascript:void(0)\">3</a></li>\r\n              <li class=\"page-item\">\r\n                <a class=\"page-link\" href=\"javascript:void(0)\">\r\n                  <i class=\"fas fa-angle-right\"></i>\r\n                  <span class=\"sr-only\">Next</span>\r\n                </a>\r\n              </li>\r\n            </ul>\r\n          </nav>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- Dark table -->\r\n  <div class=\"row mt-5\">\r\n    <div class=\"col\">\r\n      <div class=\"card bg-default shadow\">\r\n        <div class=\"card-header bg-transparent border-0\">\r\n          <h3 class=\"text-white mb-0\">Card tables</h3>\r\n        </div>\r\n        <div class=\"table-responsive\">\r\n          <table class=\"table align-items-center table-dark table-flush\">\r\n            <thead class=\"thead-dark\">\r\n              <tr>\r\n                <th scope=\"col\">Project</th>\r\n                <th scope=\"col\">Budget</th>\r\n                <th scope=\"col\">Status</th>\r\n                <th scope=\"col\">Users</th>\r\n                <th scope=\"col\">Completion</th>\r\n                <th scope=\"col\"></th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  <div class=\"media align-items-center\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar rounded-circle mr-3\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/bootstrap.jpg\">\r\n                    </a>\r\n                    <div class=\"media-body\">\r\n                      <span class=\"mb-0 text-sm\">Argon Design System</span>\r\n                    </div>\r\n                  </div>\r\n                </th>\r\n                <td>\r\n                  $2,500 USD\r\n                </td>\r\n                <td>\r\n                  <span class=\"badge badge-dot mr-4\">\r\n                    <i class=\"bg-warning\"></i> pending\r\n                  </span>\r\n                </td>\r\n                <td>\r\n                  <div class=\"avatar-group\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Ryan Tompson\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-1-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Romina Hadid\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-2-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Alexander Smith\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-3-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Jessica Doe\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-4-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">60%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-warning\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 60%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-right\">\r\n                  <div ngbDropdown placement=\"bottom-right\">\r\n                    <a class=\"btn btn-sm btn-icon-only text-light\"  ngbDropdownToggle>\r\n                      <i class=\"fas fa-ellipsis-v\"></i>\r\n                    </a>\r\n                    <div ngbDropdownMenu class=\" dropdown-menu-right dropdown-menu-arrow\">\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Something else here</a>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  <div class=\"media align-items-center\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar rounded-circle mr-3\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/angular.jpg\">\r\n                    </a>\r\n                    <div class=\"media-body\">\r\n                      <span class=\"mb-0 text-sm\">Angular Now UI Kit PRO</span>\r\n                    </div>\r\n                  </div>\r\n                </th>\r\n                <td>\r\n                  $1,800 USD\r\n                </td>\r\n                <td>\r\n                  <span class=\"badge badge-dot\">\r\n                    <i class=\"bg-success\"></i> completed\r\n                  </span>\r\n                </td>\r\n                <td>\r\n                  <div class=\"avatar-group\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Ryan Tompson\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-1-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Romina Hadid\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-2-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Alexander Smith\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-3-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Jessica Doe\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-4-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">100%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-success\" role=\"progressbar\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-right\">\r\n                  <div ngbDropdown placement=\"bottom-right\">\r\n                    <a class=\"btn btn-sm btn-icon-only text-light\"  ngbDropdownToggle>\r\n                      <i class=\"fas fa-ellipsis-v\"></i>\r\n                    </a>\r\n                    <div ngbDropdownMenu class=\" dropdown-menu-right dropdown-menu-arrow\">\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Something else here</a>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  <div class=\"media align-items-center\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar rounded-circle mr-3\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/sketch.jpg\">\r\n                    </a>\r\n                    <div class=\"media-body\">\r\n                      <span class=\"mb-0 text-sm\">Black Dashboard</span>\r\n                    </div>\r\n                  </div>\r\n                </th>\r\n                <td>\r\n                  $3,150 USD\r\n                </td>\r\n                <td>\r\n                  <span class=\"badge badge-dot mr-4\">\r\n                    <i class=\"bg-danger\"></i> delayed\r\n                  </span>\r\n                </td>\r\n                <td>\r\n                  <div class=\"avatar-group\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Ryan Tompson\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-1-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Romina Hadid\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-2-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Alexander Smith\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-3-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Jessica Doe\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-4-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">72%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-danger\" role=\"progressbar\" aria-valuenow=\"72\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 72%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-right\">\r\n                  <div ngbDropdown placement=\"top-right\">\r\n                    <a class=\"btn btn-sm btn-icon-only text-light\"  ngbDropdownToggle>\r\n                      <i class=\"fas fa-ellipsis-v\"></i>\r\n                    </a>\r\n                    <div ngbDropdownMenu class=\" dropdown-menu-right dropdown-menu-arrow\">\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Something else here</a>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  <div class=\"media align-items-center\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar rounded-circle mr-3\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/react.jpg\">\r\n                    </a>\r\n                    <div class=\"media-body\">\r\n                      <span class=\"mb-0 text-sm\">React Material Dashboard</span>\r\n                    </div>\r\n                  </div>\r\n                </th>\r\n                <td>\r\n                  $4,400 USD\r\n                </td>\r\n                <td>\r\n                  <span class=\"badge badge-dot\">\r\n                    <i class=\"bg-info\"></i> on schedule\r\n                  </span>\r\n                </td>\r\n                <td>\r\n                  <div class=\"avatar-group\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Ryan Tompson\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-1-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Romina Hadid\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-2-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Alexander Smith\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-3-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Jessica Doe\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-4-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">90%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-info\" role=\"progressbar\" aria-valuenow=\"90\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 90%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-right\">\r\n                  <div ngbDropdown placement=\"top-right\">\r\n                    <a class=\"btn btn-sm btn-icon-only text-light\"  ngbDropdownToggle>\r\n                      <i class=\"fas fa-ellipsis-v\"></i>\r\n                    </a>\r\n                    <div ngbDropdownMenu class=\" dropdown-menu-right dropdown-menu-arrow\">\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Something else here</a>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <th scope=\"row\">\r\n                  <div class=\"media align-items-center\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar rounded-circle mr-3\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/vue.jpg\">\r\n                    </a>\r\n                    <div class=\"media-body\">\r\n                      <span class=\"mb-0 text-sm\">Vue Paper UI Kit PRO</span>\r\n                    </div>\r\n                  </div>\r\n                </th>\r\n                <td>\r\n                  $2,200 USD\r\n                </td>\r\n                <td>\r\n                  <span class=\"badge badge-dot mr-4\">\r\n                    <i class=\"bg-success\"></i> completed\r\n                  </span>\r\n                </td>\r\n                <td>\r\n                  <div class=\"avatar-group\">\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Ryan Tompson\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-1-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Romina Hadid\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-2-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Alexander Smith\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-3-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                    <a href=\"javascript:void(0)\" class=\"avatar avatar-sm\" data-toggle=\"tooltip\" data-original-title=\"Jessica Doe\">\r\n                      <img alt=\"Image placeholder\" src=\"../assets/img/theme/team-4-800x800.jpg\" class=\"rounded-circle\">\r\n                    </a>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex align-items-center\">\r\n                    <span class=\"mr-2\">100%</span>\r\n                    <div>\r\n                      <div class=\"progress\">\r\n                        <div class=\"progress-bar bg-success\" role=\"progressbar\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%;\"></div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n                <td class=\"text-right\">\r\n                  <div ngbDropdown placement=\"top-right\">\r\n                    <a class=\"btn btn-sm btn-icon-only text-light\"  ngbDropdownToggle>\r\n                      <i class=\"fas fa-ellipsis-v\"></i>\r\n                    </a>\r\n                    <div ngbDropdownMenu class=\" dropdown-menu-right dropdown-menu-arrow\">\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"javascript:void(0)\">Something else here</a>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user-profile/user-profile.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user-profile/user-profile.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-8 pt-5 pt-lg-8 d-flex align-items-center\" style=\"min-height: 600px; background-image: url(assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;\">\r\n  <!-- Mask -->\r\n  <span class=\"mask bg-gradient-danger opacity-8\"></span>\r\n  <!-- Header container -->\r\n  <div class=\"container-fluid d-flex align-items-center\">\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-7 col-md-10\">\r\n        <h1 class=\"display-2 text-white\">Hello Jesse</h1>\r\n        <p class=\"text-white mt-0 mb-5\">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>\r\n        <a href=\"#!\" class=\"btn btn-info\">Edit profile</a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"container-fluid mt--7\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xl-4 order-xl-2 mb-5 mb-xl-0\">\r\n      <div class=\"card card-profile shadow\">\r\n        <div class=\"row justify-content-center\">\r\n          <div class=\"col-lg-3 order-lg-2\">\r\n            <div class=\"card-profile-image\">\r\n              <a href=\"javascript:void(0)\">\r\n                <img src=\"assets/img/theme/team-4-800x800.jpg\" class=\"rounded-circle\">\r\n              </a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4\">\r\n          <div class=\"d-flex justify-content-between\">\r\n            <a href=\"javascript:void(0)\" class=\"btn btn-sm btn-info mr-4\">Connect</a>\r\n            <a href=\"javascript:void(0)\" class=\"btn btn-sm btn-default float-right\">Message</a>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body pt-0 pt-md-4\">\r\n          <div class=\"row\">\r\n            <div class=\"col\">\r\n              <div class=\"card-profile-stats d-flex justify-content-center mt-md-5\">\r\n                <div>\r\n                  <span class=\"heading\">22</span>\r\n                  <span class=\"description\">Friends</span>\r\n                </div>\r\n                <div>\r\n                  <span class=\"heading\">10</span>\r\n                  <span class=\"description\">Photos</span>\r\n                </div>\r\n                <div>\r\n                  <span class=\"heading\">89</span>\r\n                  <span class=\"description\">Comments</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"text-center\">\r\n            <h3>\r\n              Jessica Jones<span class=\"font-weight-light\">, 27</span>\r\n            </h3>\r\n            <div class=\"h5 font-weight-300\">\r\n              <i class=\"ni location_pin mr-2\"></i>Bucharest, Romania\r\n            </div>\r\n            <div class=\"h5 mt-4\">\r\n              <i class=\"ni business_briefcase-24 mr-2\"></i>Solution Manager - Creative Tim Officer\r\n            </div>\r\n            <div>\r\n              <i class=\"ni education_hat mr-2\"></i>University of Computer Science\r\n            </div>\r\n            <hr class=\"my-4\" />\r\n            <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>\r\n            <a href=\"javascript:void(0)\">Show more</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xl-8 order-xl-1\">\r\n      <div class=\"card bg-secondary shadow\">\r\n        <div class=\"card-header bg-white border-0\">\r\n          <div class=\"row align-items-center\">\r\n            <div class=\"col-8\">\r\n              <h3 class=\"mb-0\">My account</h3>\r\n            </div>\r\n            <div class=\"col-4 text-right\">\r\n              <a href=\"#!\" class=\"btn btn-sm btn-primary\">Settings</a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form>\r\n            <h6 class=\"heading-small text-muted mb-4\">User information</h6>\r\n            <div class=\"pl-lg-4\">\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-username\">Username</label>\r\n                    <input type=\"text\" id=\"input-username\" class=\"form-control form-control-alternative\" placeholder=\"Username\" value=\"lucky.jesse\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-email\">Email address</label>\r\n                    <input type=\"email\" id=\"input-email\" class=\"form-control form-control-alternative\" placeholder=\"jesse@example.com\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-first-name\">First name</label>\r\n                    <input type=\"text\" id=\"input-first-name\" class=\"form-control form-control-alternative\" placeholder=\"First name\" value=\"Lucky\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-last-name\">Last name</label>\r\n                    <input type=\"text\" id=\"input-last-name\" class=\"form-control form-control-alternative\" placeholder=\"Last name\" value=\"Jesse\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <hr class=\"my-4\" />\r\n            <!-- Address -->\r\n            <h6 class=\"heading-small text-muted mb-4\">Contact information</h6>\r\n            <div class=\"pl-lg-4\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-address\">Address</label>\r\n                    <input id=\"input-address\" class=\"form-control form-control-alternative\" placeholder=\"Home Address\" value=\"Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09\" type=\"text\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-4\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-city\">City</label>\r\n                    <input type=\"text\" id=\"input-city\" class=\"form-control form-control-alternative\" placeholder=\"City\" value=\"New York\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-4\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-country\">Country</label>\r\n                    <input type=\"text\" id=\"input-country\" class=\"form-control form-control-alternative\" placeholder=\"Country\" value=\"United States\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-4\">\r\n                  <div class=\"form-group\">\r\n                    <label class=\"form-control-label\" for=\"input-country\">Postal code</label>\r\n                    <input type=\"number\" id=\"input-postal-code\" class=\"form-control form-control-alternative\" placeholder=\"Postal code\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <hr class=\"my-4\" />\r\n            <!-- Description -->\r\n            <h6 class=\"heading-small text-muted mb-4\">About me</h6>\r\n            <div class=\"pl-lg-4\">\r\n              <div class=\"form-group\">\r\n                <label>About Me</label>\r\n                <textarea rows=\"4\" class=\"form-control form-control-alternative\" placeholder=\"A few words about you ...\">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.module.ts ***!
  \*************************************************************/
/*! exports provided: AdminLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutModule", function() { return AdminLayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-clipboard */ "./node_modules/ngx-clipboard/__ivy_ngcc__/fesm5/ngx-clipboard.js");
/* harmony import */ var _admin_layout_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-layout.routing */ "./src/app/layouts/admin-layout/admin-layout.routing.ts");
/* harmony import */ var _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pages/dashboard/dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var _pages_icons_icons_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../pages/icons/icons.component */ "./src/app/pages/icons/icons.component.ts");
/* harmony import */ var _pages_maps_maps_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../pages/maps/maps.component */ "./src/app/pages/maps/maps.component.ts");
/* harmony import */ var _pages_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../pages/user-profile/user-profile.component */ "./src/app/pages/user-profile/user-profile.component.ts");
/* harmony import */ var _pages_tables_tables_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../pages/tables/tables.component */ "./src/app/pages/tables/tables.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm5/ng-bootstrap.js");
/* harmony import */ var src_app_modal_modal_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/modal/modal.component */ "./src/app/modal/modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};














// import { ToastrModule } from 'ngx-toastr';
var AdminLayoutModule = /** @class */ (function () {
    function AdminLayoutModule() {
    }
    AdminLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_admin_layout_routing__WEBPACK_IMPORTED_MODULE_6__["AdminLayoutRoutes"]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__["NgbModule"],
                ngx_clipboard__WEBPACK_IMPORTED_MODULE_5__["ClipboardModule"]
            ],
            declarations: [
                _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__["DashboardComponent"],
                _pages_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_10__["UserProfileComponent"],
                _pages_tables_tables_component__WEBPACK_IMPORTED_MODULE_11__["TablesComponent"],
                _pages_icons_icons_component__WEBPACK_IMPORTED_MODULE_8__["IconsComponent"],
                _pages_maps_maps_component__WEBPACK_IMPORTED_MODULE_9__["MapsComponent"],
                src_app_modal_modal_component__WEBPACK_IMPORTED_MODULE_13__["ModalComponent"]
            ],
            entryComponents: [src_app_modal_modal_component__WEBPACK_IMPORTED_MODULE_13__["ModalComponent"]]
        })
    ], AdminLayoutModule);
    return AdminLayoutModule;
}());



/***/ }),

/***/ "./src/app/layouts/admin-layout/admin-layout.routing.ts":
/*!**************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.routing.ts ***!
  \**************************************************************/
/*! exports provided: AdminLayoutRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutRoutes", function() { return AdminLayoutRoutes; });
/* harmony import */ var _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pages/dashboard/dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var _pages_icons_icons_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages/icons/icons.component */ "./src/app/pages/icons/icons.component.ts");
/* harmony import */ var _pages_maps_maps_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/maps/maps.component */ "./src/app/pages/maps/maps.component.ts");
/* harmony import */ var _pages_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pages/user-profile/user-profile.component */ "./src/app/pages/user-profile/user-profile.component.ts");
/* harmony import */ var _pages_tables_tables_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pages/tables/tables.component */ "./src/app/pages/tables/tables.component.ts");
/* harmony import */ var src_app_pages_join_quiz_join_quiz_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/pages/join-quiz/join-quiz.component */ "./src/app/pages/join-quiz/join-quiz.component.ts");
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






var AdminLayoutRoutes = [
    { path: 'dashboard', component: _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__["DashboardComponent"] },
    { path: 'joinQuiz', component: src_app_pages_join_quiz_join_quiz_component__WEBPACK_IMPORTED_MODULE_5__["JoinQuizComponent"] },
    { path: 'user-profile', component: _pages_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_3__["UserProfileComponent"] },
    { path: 'tables', component: _pages_tables_tables_component__WEBPACK_IMPORTED_MODULE_4__["TablesComponent"] },
    { path: 'icons', component: _pages_icons_icons_component__WEBPACK_IMPORTED_MODULE_1__["IconsComponent"] },
    { path: 'maps', component: _pages_maps_maps_component__WEBPACK_IMPORTED_MODULE_2__["MapsComponent"] }
];


/***/ }),

/***/ "./src/app/modal/modal.component.ts":
/*!******************************************!*\
  !*** ./src/app/modal/modal.component.ts ***!
  \******************************************/
/*! exports provided: ModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalComponent", function() { return ModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var ModalComponent = /** @class */ (function () {
    function ModalComponent(modalService) {
        this.modalService = modalService;
        this.closeResult = '';
    }
    ModalComponent.prototype.ngOnInit = function () {
    };
    ModalComponent.prototype.ngOnChanges = function () {
    };
    ModalComponent.prototype.open = function () {
        var _this = this;
        // and use the reference from the component itself
        this.modalService.open(this.content).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            console.log(reason);
        });
    };
    ModalComponent.prototype.getDismissReason = function (reason) {
        if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["ModalDismissReasons"].ESC) {
            return 'by pressing ESC';
        }
        else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["ModalDismissReasons"].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    ModalComponent.ctorParameters = function () { return [
        { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('joinQuizModal'),
        __metadata("design:type", Object)
    ], ModalComponent.prototype, "content", void 0);
    ModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-modal',
            template: __importDefault(__webpack_require__(/*! raw-loader!./modal.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/modal/modal.component.html")).default
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"]])
    ], ModalComponent);
    return ModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".card-height {\n  min-height: 350px;\n  height: 350px;\n  /* cross-browser */\n}\n\n.clickable {\n  cursor: pointer;\n}\n\n.card i {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  -webkit-transition-duration: 0.4s;\n          transition-duration: 0.4s;\n}\n\n.card:hover i {\n  -webkit-transform: scale(1.2);\n          transform: scale(1.2);\n  -webkit-transition-duration: 0.4s;\n          transition-duration: 0.4s;\n}\n\n.correct-answer {\n  -webkit-transition-duration: 0.4s;\n          transition-duration: 0.4s;\n  border-color: #2dce89;\n  background-color: #2dce89;\n}\n\n.incorrect-answer {\n  -webkit-transition-duration: 0.4s;\n          transition-duration: 0.4s;\n  border-color: #f5365c;\n  background-color: #f5365c;\n}\n\n.change-opacity-on-answer {\n  -webkit-transition-delay: 1.5s;\n          transition-delay: 1.5s;\n  -webkit-transition-duration: 2s;\n          transition-duration: 2s;\n  opacity: 0;\n  visibility: hidden;\n}\n\n.bleed {\n  top: 10%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL0M6XFxVc2Vyc1xcSmFtZXNcXHNvdXJjZVxccmVwb3NcXHF1aXptYXN0ZXIvc3JjXFxhcHBcXHBhZ2VzXFxkYXNoYm9hcmRcXGRhc2hib2FyZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFBO0VBQ0EsYUFBQTtFQUFlLGtCQUFBO0FDRW5COztBRENBO0VBQ0ksZUFBQTtBQ0VKOztBREVJO0VBQ0ksMkJBQUE7VUFBQSxtQkFBQTtFQUNBLGlDQUFBO1VBQUEseUJBQUE7QUNDUjs7QURJSTtFQUNJLDZCQUFBO1VBQUEscUJBQUE7RUFDQSxpQ0FBQTtVQUFBLHlCQUFBO0FDRFI7O0FES0E7RUFDSSxpQ0FBQTtVQUFBLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSx5QkFBQTtBQ0ZKOztBREtBO0VBQ0ksaUNBQUE7VUFBQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0EseUJBQUE7QUNGSjs7QURLQTtFQUNJLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0FDRko7O0FES0E7RUFDSSxRQUFBO0FDRkoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQtaGVpZ2h0IHtcclxuICAgIG1pbi1oZWlnaHQ6IDM1MHB4O1xyXG4gICAgaGVpZ2h0OiAzNTBweDsgLyogY3Jvc3MtYnJvd3NlciAqL1xyXG59XHJcblxyXG4uY2xpY2thYmxlIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmNhcmQge1xyXG4gICAgaSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgICAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAuNHM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5jYXJkOmhvdmVyIHtcclxuICAgIGkge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcclxuICAgICAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAuNHM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5jb3JyZWN0LWFuc3dlciB7XHJcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAuNHM7XHJcbiAgICBib3JkZXItY29sb3I6ICMyZGNlODk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmRjZTg5O1xyXG59XHJcblxyXG4uaW5jb3JyZWN0LWFuc3dlciB7XHJcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAuNHM7XHJcbiAgICBib3JkZXItY29sb3I6ICNmNTM2NWM7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjUzNjVjO1xyXG59XHJcblxyXG4uY2hhbmdlLW9wYWNpdHktb24tYW5zd2VyIHtcclxuICAgIHRyYW5zaXRpb24tZGVsYXk6IDEuNXM7XHJcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAycztcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XHJcbn1cclxuXHJcbi5ibGVlZCB7XHJcbiAgICB0b3A6IDEwJTsgXHJcbn0iLCIuY2FyZC1oZWlnaHQge1xuICBtaW4taGVpZ2h0OiAzNTBweDtcbiAgaGVpZ2h0OiAzNTBweDtcbiAgLyogY3Jvc3MtYnJvd3NlciAqL1xufVxuXG4uY2xpY2thYmxlIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uY2FyZCBpIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC40cztcbn1cblxuLmNhcmQ6aG92ZXIgaSB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC40cztcbn1cblxuLmNvcnJlY3QtYW5zd2VyIHtcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC40cztcbiAgYm9yZGVyLWNvbG9yOiAjMmRjZTg5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmRjZTg5O1xufVxuXG4uaW5jb3JyZWN0LWFuc3dlciB7XG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDAuNHM7XG4gIGJvcmRlci1jb2xvcjogI2Y1MzY1YztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1MzY1Yztcbn1cblxuLmNoYW5nZS1vcGFjaXR5LW9uLWFuc3dlciB7XG4gIHRyYW5zaXRpb24tZGVsYXk6IDEuNXM7XG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDJzO1xuICBvcGFjaXR5OiAwO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbi5ibGVlZCB7XG4gIHRvcDogMTAlO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.ts ***!
  \********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var src_app_modal_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modal/modal.component */ "./src/app/modal/modal.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm5/ng-bootstrap.js");
/* harmony import */ var src_app_quizmaster_api_client_quizmaster_api_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/quizmaster-api-client/quizmaster-api-service.service */ "./src/app/quizmaster-api-client/quizmaster-api-service.service.ts");
/* harmony import */ var src_app_party_member_party_member_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/party-member/party-member.service */ "./src/app/party-member/party-member.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(modalService, quizMasterApiClient, router, partyMemberService) {
        this.modalService = modalService;
        this.quizMasterApiClient = quizMasterApiClient;
        this.router = router;
        this.partyMemberService = partyMemberService;
        this.showJoinQuizModal = false;
        this.showHostQuizModal = false;
        this.showPartyModal = false;
        this.isLoaded = false;
        this.answerIsSelected = false;
        this.css = [];
        this.userIsHost = false;
        this.partyMembers = [
            "John",
            "Mary",
            "Steve",
            "Ash"
        ];
        this.party = [];
        this.difficulties = [
            "Any",
            "Easy",
            "Medium",
            "Hard"
        ];
        this.makeOpaque = "change-opacity-on-answer";
        this.closeResult = '';
        this.timeoutInAction = false;
        var defaultIndex = 0;
        var defaultDifficulty = this.difficulties[defaultIndex];
        this.selectedDifficulty = {
            value: defaultDifficulty,
            index: defaultIndex
        };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.partyMemberService.partyMembers.subscribe(function (msg) {
                            if (msg.action === "join") {
                                //this.party.push(msg.username);
                                _this.party = msg.partyList;
                                console.log("Dashboard message: " + msg.username + " has joined...");
                            }
                            else if (msg.action === "ppp") {
                                console.log("Dashboard message: thing said ppp");
                            }
                            else if (msg.action === "leave") {
                                _this.party = msg.partyList;
                                // var index = this.party.indexOf(msg.username);
                                // if(index > -1) {
                                //   this.party.splice(index, 1);
                                //   console.log("Dashboard message: " + msg.username + " has left...")
                                // }
                            }
                        });
                        return [4 /*yield*/, this.generateRandomQuestion()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DashboardComponent.prototype.generateRandomQuestion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.quizMasterApiClient.getRandomQuestion()];
                    case 1:
                        _a.randomQuestion = _b.sent();
                        this.setAnswerChoices();
                        this.answers.forEach(function (ans, index) {
                            _this.css[index] = ans.isCorrect ? "correct-answer" : "incorrect-answer";
                        });
                        this.answerIsSelected = false;
                        this.isLoaded = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    DashboardComponent.prototype.openModal = function (content) {
        var _this = this;
        // and use the reference from the component itself
        this.modalService.open(content).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            console.log(reason);
            if (reason === "Cross click") {
                _this.partyMemberService.leaveQuiz(_this.username, _this.quizId);
            }
        });
    };
    DashboardComponent.prototype.updateQuestionDifficulty = function (difficulty) {
        this.selectedDifficulty.index = difficulty;
        this.selectedDifficulty.value = this.difficulties[difficulty];
    };
    DashboardComponent.prototype.setAnswerChoices = function () {
        var _a, _b;
        var possibleAnswers = [];
        this.randomQuestion.incorrectAnswers.forEach(function (answer) {
            possibleAnswers.push({ text: answer, isCorrect: false });
        });
        possibleAnswers.push({ text: this.randomQuestion.correctAnswer, isCorrect: true });
        // shuffle answers
        if (possibleAnswers.length > 2) {
            for (var i = possibleAnswers.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                _a = [possibleAnswers[j], possibleAnswers[i]], possibleAnswers[i] = _a[0], possibleAnswers[j] = _a[1];
            }
        }
        else if (possibleAnswers[0].text === "False") {
            _b = [possibleAnswers[1], possibleAnswers[0]], possibleAnswers[0] = _b[0], possibleAnswers[1] = _b[1];
        }
        this.answers = possibleAnswers;
    };
    DashboardComponent.prototype.checkAnswer = function (i) {
        this.answerIsSelected = true;
        return this.answers[i].isCorrect;
    };
    DashboardComponent.prototype.regenerateRandomQuestion = function () {
        var _this = this;
        if (!this.timeoutInAction) {
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.generateRandomQuestion()];
                        case 1:
                            _a.sent();
                            this.timeoutInAction = false;
                            return [2 /*return*/];
                    }
                });
            }); }, 2500);
        }
        this.timeoutInAction = true;
        return this.makeOpaque;
    };
    DashboardComponent.prototype.startQuiz = function () {
    };
    DashboardComponent.prototype.joinQuiz = function (quizId, username, joinQuizModal) {
        return __awaiter(this, void 0, void 0, function () {
            var response, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.modalService.dismissAll();
                        return [4 /*yield*/, this.quizMasterApiClient.joinQuiz(quizId, username)];
                    case 1:
                        response = _a.sent();
                        this.username = username;
                        this.quizId = quizId;
                        message = {
                            username: username,
                            quizId: quizId
                        };
                        this.showPartyModal = true;
                        this.openModal(this.showPartyModalContent);
                        this.partyMemberService.joinQuiz(username, quizId);
                        return [2 /*return*/];
                }
            });
        });
    };
    DashboardComponent.prototype.hostQuiz = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var response, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.username = username;
                        return [4 /*yield*/, this.quizMasterApiClient.hostQuiz(username, this.selectedDifficulty.index)];
                    case 1:
                        response = _a.sent();
                        this.modalService.dismissAll();
                        if (response.statusCode === 200) {
                            message = {
                                username: username,
                                quizId: response.quizId
                            };
                            //this.router.navigate(['/joinQuiz']);
                            this.quizId = response.quizId;
                            this.showPartyModal = true;
                            this.userIsHost = true;
                            this.openModal(this.showPartyModalContent);
                            this.partyMemberService.joinQuiz(username, response.quizId);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DashboardComponent.ctorParameters = function () { return [
        { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"] },
        { type: src_app_quizmaster_api_client_quizmaster_api_service_service__WEBPACK_IMPORTED_MODULE_4__["QuizmasterApiService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"] },
        { type: src_app_party_member_party_member_service__WEBPACK_IMPORTED_MODULE_5__["PartyMemberService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('showPartyModal'),
        __metadata("design:type", Object)
    ], DashboardComponent.prototype, "showPartyModalContent", void 0);
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                src_app_modal_modal_component__WEBPACK_IMPORTED_MODULE_2__["ModalComponent"]
            ]
        }),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: __importDefault(__webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dashboard.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/pages/dashboard/dashboard.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"], src_app_quizmaster_api_client_quizmaster_api_service_service__WEBPACK_IMPORTED_MODULE_4__["QuizmasterApiService"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"], src_app_party_member_party_member_service__WEBPACK_IMPORTED_MODULE_5__["PartyMemberService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/pages/icons/icons.component.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/icons/icons.component.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2ljb25zL2ljb25zLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/pages/icons/icons.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/icons/icons.component.ts ***!
  \************************************************/
/*! exports provided: IconsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconsComponent", function() { return IconsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var IconsComponent = /** @class */ (function () {
    function IconsComponent() {
    }
    IconsComponent.prototype.ngOnInit = function () {
    };
    IconsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-icons',
            template: __importDefault(__webpack_require__(/*! raw-loader!./icons.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/icons/icons.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./icons.component.scss */ "./src/app/pages/icons/icons.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], IconsComponent);
    return IconsComponent;
}());



/***/ }),

/***/ "./src/app/pages/maps/maps.component.scss":
/*!************************************************!*\
  !*** ./src/app/pages/maps/maps.component.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL21hcHMvbWFwcy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/pages/maps/maps.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/maps/maps.component.ts ***!
  \**********************************************/
/*! exports provided: MapsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapsComponent", function() { return MapsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var MapsComponent = /** @class */ (function () {
    function MapsComponent() {
    }
    MapsComponent.prototype.ngOnInit = function () {
        var map = document.getElementById('map-canvas');
        var lat = map.getAttribute('data-lat');
        var lng = map.getAttribute('data-lng');
        var myLatlng = new google.maps.LatLng(lat, lng);
        var mapOptions = {
            zoom: 12,
            scrollwheel: false,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] },
                { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] },
                { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] },
                { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] },
                { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] },
                { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
                { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] },
                { "featureType": "water", "elementType": "all", "stylers": [{ "color": '#5e72e4' }, { "visibility": "on" }] }
            ]
        };
        map = new google.maps.Map(map, mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'Hello World!'
        });
        var contentString = '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
            '<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
    };
    MapsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-maps',
            template: __importDefault(__webpack_require__(/*! raw-loader!./maps.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/maps/maps.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./maps.component.scss */ "./src/app/pages/maps/maps.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], MapsComponent);
    return MapsComponent;
}());



/***/ }),

/***/ "./src/app/pages/tables/tables.component.scss":
/*!****************************************************!*\
  !*** ./src/app/pages/tables/tables.component.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3RhYmxlcy90YWJsZXMuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/tables/tables.component.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/tables/tables.component.ts ***!
  \**************************************************/
/*! exports provided: TablesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablesComponent", function() { return TablesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var TablesComponent = /** @class */ (function () {
    function TablesComponent() {
    }
    TablesComponent.prototype.ngOnInit = function () {
    };
    TablesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tables',
            template: __importDefault(__webpack_require__(/*! raw-loader!./tables.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/tables/tables.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./tables.component.scss */ "./src/app/pages/tables/tables.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], TablesComponent);
    return TablesComponent;
}());



/***/ }),

/***/ "./src/app/pages/user-profile/user-profile.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/pages/user-profile/user-profile.component.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3VzZXItcHJvZmlsZS91c2VyLXByb2ZpbGUuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/user-profile/user-profile.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/user-profile/user-profile.component.ts ***!
  \**************************************************************/
/*! exports provided: UserProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileComponent", function() { return UserProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent() {
    }
    UserProfileComponent.prototype.ngOnInit = function () {
    };
    UserProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-profile',
            template: __importDefault(__webpack_require__(/*! raw-loader!./user-profile.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user-profile/user-profile.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./user-profile.component.scss */ "./src/app/pages/user-profile/user-profile.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], UserProfileComponent);
    return UserProfileComponent;
}());



/***/ })

}]);
//# sourceMappingURL=layouts-admin-layout-admin-layout-module.js.map