Module.register("compliments", {
  defaults: {
    result: "Loading...",
    updateInterval: 5000,
    remoteFile: "https://auth0-magic-mirror.herokuapp.com/v1/meeting",
    fadeSpeed: 4000
  },

  getScripts: function () {
    return ["moment.js"];
  },

  start: function () {
    Log.info("Starting module: " + this.name);

    var self = this;
    setInterval(function () {
      self.complimentFile(function (response) {
        var text = JSON.parse(response).status || "Loading...";
        self.config.result = text;
        self.updateDom(self.config.fadeSpeed);
      });
    }, this.config.updateInterval);
  },

  complimentFile: function (callback) {
    var xobj = new XMLHttpRequest(),
      isRemote =
        this.config.remoteFile.indexOf("http://") === 0 ||
        this.config.remoteFile.indexOf("https://") === 0,
      path = isRemote
        ? this.config.remoteFile
        : this.file(this.config.remoteFile);
    xobj.overrideMimeType("application/json");
    xobj.open("GET", path, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState === 4 && xobj.status === 200) {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  },

  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.className = this.config.classes
      ? this.config.classes
      : "thin xlarge bright pre-line";
    var text = this.config.result;
    var parts = text.split("\n");
    var compliment = document.createElement("span");
    for (var part of parts) {
      compliment.appendChild(document.createTextNode(part));
      compliment.appendChild(document.createElement("BR"));
    }
    compliment.lastElementChild.remove();
    wrapper.appendChild(compliment);

    return wrapper;
  }
});
