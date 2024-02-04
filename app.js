"use strict";

function mriApp(selector) {
  return new mriApp.prototype.init(selector);
}

mriApp.prototype = {
  init: function (selector) {
    this.selector = selector;
    this.url = '';
    this.method = '';
    this.data = null;
    this.successCallback = null;
    this.errorCallback = null;
    return this;
  },

  setUrl: function (url) {
    this.url = url;
    return this;
  },

  setMethod: function (method) {
    this.method = method;
    return this;
  },

  setData: function (data) {
    this.data = data;
    return this;
  },

  setSuccessCallback: function (successCallback) {
    this.successCallback = successCallback;
    return this;
  },

  setErrorCallback: function (errorCallback) {
    this.errorCallback = errorCallback;
    return this;
  },

  submitAjaxRequest: function () {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.successCallback(xhr.responseText);
        } else {
          this.errorCallback('Error: ' + xhr.status);
        }
      }
    }.bind(this);

    xhr.open(this.method, this.url, true);
    if (this.method === 'POST') {
      // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded', 'multipart/form-data');
      xhr.setRequestHeader('Content-type', 'application/json', 'multipart/form-data');
    }
    xhr.send(this.data);

    return this;
  },

  createRecord: function (options) {
    return this
      .setUrl(options.url)
      .setMethod(options.method)
      .setData(JSON.stringify(options.data))
      .setSuccessCallback(options.success)
      .setErrorCallback(options.error)
      .submitAjaxRequest();
  },

  updateRecord: function (options, id) {
    var updatedUrl = options.url + '/' + id;
    return this
      .setUrl(updatedUrl)
      .setMethod(options.method)
      .setData(options.data)
      .setSuccessCallback(options.success)
      .setErrorCallback(options.error)
      .submitAjaxRequest();
  },

  deleteRecord: function (options, id) {
    var deletedUrl = options.url + '/' + id;
    return this
      .setUrl(deletedUrl)
      .setMethod(options.method)
      .setData(null)
      .setSuccessCallback(options.success)
      .setErrorCallback(options.error)
      .submitAjaxRequest();
  },

  fetchRecords: function (options) {
    return this
      .setUrl(options.url)
      .setMethod(options.method)
      .setData(null)
      .setSuccessCallback(options.success)
      .setErrorCallback(options.error)
      .submitAjaxRequest();
  },

  // Additional functions

  hideBoxes: function (boxes) {
    boxes.forEach((box, index) => {
      setTimeout(function () {
        box.classList.add('hidden');
      }, 5000 * (index + 1));
    });
  },

  returnLT: function () {
    let getTime = new Date();
    let h = getTime.getHours() % 12 <= 9 ? '0' + getTime.getHours() % 12 : getTime.getHours() % 12;
    let m = getTime.getMinutes() <= 9 ? '0' + getTime.getMinutes() : getTime.getMinutes();
    let s = getTime.getSeconds() <= 9 ? '0' + getTime.getSeconds() : getTime.getSeconds();
    return h + ':' + m + ':' + s;
  },

  updateClock: function () {
    var displayElement = document.getElementById('display');
    if (displayElement) {
      displayElement.innerText = this.returnLT();
    }
  },

  toggleDropdown: function () {
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.remove("hidden");
  },

  closeDropdown: function () {
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.add("hidden");
  },

  openCloseMenu: function (content) {
    var dropdownContent = document.getElementById(content);

    if (dropdownContent.classList.contains('hidden')) {
      dropdownContent.classList.remove('hidden');
      dropdownContent.classList.add('block');
    } else {
      dropdownContent.classList.remove('block');
      dropdownContent.classList.add('hidden');
    }
  },

  showToastr: function (type, message, time) {
    const toasterBoxAria = document.getElementById('toaster-box-aria');
    const toasterBox = document.getElementById('toaster-box');
    const toasterType = document.getElementById('toaster-type');
    const toasterMsg = document.getElementById('toaster-msg');

    toasterBoxAria.classList.add('hidden');

    if (type === 'info') {
      toasterType.innerText = 'Info';
      toasterBox.classList.add('bg-blue-500');
    } else if (type === 'success') {
      console.log('Here');
      toasterType.innerText = 'Success';
      toasterBox.classList.add('bg-green-500');
    } else if (type === 'error') {
      toasterType.innerText = 'Error';
      toasterBox.classList.add('bg-red-500');
    } else if (type === 'warning') {
      toasterType.innerText = 'Warning';
      toasterBox.classList.add('bg-yellow-500');
    } else {
      return false;
    }

    toasterMsg.innerText = message;
    toasterBoxAria.classList.remove('hidden');

    setTimeout(() => {
      toasterBoxAria.classList.add('hidden');
    }, time);
  }
};

mriApp.prototype.init.prototype = mriApp.prototype;