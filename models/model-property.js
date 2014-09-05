var app = require('../app');

/**
 * Represents a Property of a LoopBack `Model`.
 *
 * @class ModelProperty
 * @inherits WorkspaceEntity
 */

var ModelProperty = app.models.ModelProperty;

ModelProperty.validatesFormatOf('name', { with: /^[\-_a-zA-Z0-9]+$/ });

/**
 * List of built-in types that can be used for `ModelProperty.type`.
 * @type {string[]}
 */
ModelProperty.availableTypes = [
  'string',
  'number',
  'boolean',
  'object',
  'array',
  'date',
  'buffer',
  'geopoint'
];
