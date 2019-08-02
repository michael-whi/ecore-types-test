"use strict";
exports.__esModule = true;
var ecore_1 = require("ecore");
// Main test
// Resources contain model elements and are identified by a URI.
var resourceSet = ecore_1["default"].ResourceSet.create();
var resource = resourceSet.create({ uri: 'model.json' });
// EClass are used to define domain elements, they are identified
// by name and a set of structural features (attributes and references).
var User = ecore_1["default"].EClass.create({
    name: 'User',
    eStructuralFeatures: [
        // EAttributes are used to define domain elements
        // elements properties.
        ecore_1["default"].EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: ecore_1["default"].EString
        }),
        // EReference are used to define links between domain
        // elements.
        ecore_1["default"].EReference.create({
            name: 'friends',
            upperBound: -1,
            containment: false,
            eType: function () { return User; }
        })
    ]
});
// EPackages represent namespaces for a set of EClasses.
// It's properties name, nsURI and nsPrefix must be set.
var SamplePackage = ecore_1["default"].EPackage.create({
    name: 'sample',
    nsURI: 'http://www.example.org/sample',
    nsPrefix: 'sample',
    eClassifiers: [
        User
    ]
});
// Packages must be added directly to the model's Resource.
resource.add(SamplePackage);
// Additional tests
// EList find
resource.eClass.get('AllStructuralFeatures').find(function (eObj) { return eObj.get('name') === ""; });
// Resource
resource.getEObject("test");
resource.parse(User, function () { });
resource.to();
