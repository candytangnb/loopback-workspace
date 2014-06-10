var app = require('../app');
var async = require('async');
var DataSourceDefinition = app.models.DataSourceDefinition;
var ModelDefinition = app.models.ModelDefinition;
var ViewDefinition = app.models.ViewDefinition;
var templates = require('../templates');
var availableTemplates = Object.keys(templates);

/**
 * Defines a `LoopBackApp` configuration.
 * @class AppDefinition
 * @inherits Definition
 */

var AppDefinition = app.models.AppDefinition;


AppDefinition.findFiles = function(cb) {
  // listFiles
  // forEach =>
  //   matches 'app.*.json'
}

AppDefinition.fromFile = function(file, data) {
  data.name = data.name || path.dirname(file);
  return data;
}

/**
 * Does the given `app` exist on disk as a directory?
 *
 * @param {AppDefinition} app
 * @callback {Function} callback
 * @param {Error} err
 */

AppDefinition.exists = function(app, cb) {
  app.exists(cb);
}

/**
 * Does the given `app` exist on disk as a directory?
 *
 * @param {AppDefinition} app
 * @callback {Function} callback
 * @param {Error} err
 */

AppDefinition.prototype.exists = function(cb) {
  fs.stat(this.getDir(), function(err, stat) {
    if(err) return cb(err);
    cb(null, stat.isDirectory());
  });
}

/**
 * Get an array of available template names.
 *
 * @callback {Function} callback
 * @param {Error} err
 * @param {String[]} templateNames 
 */

AppDefinition.getAvailableTemplates = function(cb) {
  cb(null, availableTemplates);
}

/**
 * In the attached `dataSource`, create a set of app definitions and
 * corresponding workspace entities using the given template.
 *
 * @param {String} templateName
 * @callback {Function} callback
 * @param {Error} err
 */

AppDefinition.createFromTemplate = function(templateName, cb) {
  var template = templates[templateName];

  if(!template) {
    var err = new Error('Invalid template...');
    err.templateName = templateName;
    err.availableTemplates = availableTemplates;
    err.statusCode = 400;
    return cb(err);
  }

  var steps = [
    createApps,
    createDataSources,
    createModels,
    createViews
  ];

  async.parallel(steps, cb);

  function createApps(cb) {
    async.each(template.apps || [],
      AppDefinition.create.bind(AppDefinition), cb);
  }

  function createDataSources(cb) {
    async.each(template.datasources || [],
      DataSourceDefinition.create.bind(DataSourceDefinition), cb);
  }

  function createModels(cb) {
    async.each(template.models || [],
      ModelDefinition.create.bind(ModelDefinition), cb);
  }

  function createViews(cb) {
    async.each(template.views || [],
      ViewDefinition.create.bind(ViewDefinition), cb);
  }
}

