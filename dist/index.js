"use strict";
exports.__esModule = true;
var Ecore = require("ecore");
// Main test
// Resources contain model elements and are identified by a URI.
var resourceSet = Ecore.ResourceSet.create();
var resource = resourceSet.create({ uri: 'model.json' });
// EClass are used to define domain elements, they are identified
// by name and a set of structural features (attributes and references).
var User = Ecore.EClass.create({
    name: 'User',
    eStructuralFeatures: [
        // EAttributes are used to define domain elements
        // elements properties.
        Ecore.EAttribute.create({
            name: 'name',
            upperBound: 1,
            eType: Ecore.EString
        }),
        // EReference are used to define links between domain
        // elements.
        Ecore.EReference.create({
            name: 'friends',
            upperBound: -1,
            containment: false,
            eType: function () {
                return User;
            }
        }),
    ]
});
// EPackages represent namespaces for a set of EClasses.
// It's properties name, nsURI and nsPrefix must be set.
var SamplePackage = Ecore.EPackage.create({
    name: 'sample',
    nsURI: 'http://www.example.org/sample',
    nsPrefix: 'sample',
    eClassifiers: [User]
});
// Packages must be added directly to the model's Resource.
resource.add(SamplePackage);
// Additional tests
// EList find
resource.eClass.get('AllStructuralFeatures').find(function (eObj) { return eObj.get('name') === ''; });
// Resource
resource.getEObject('test');
resource.parse(User, function () { });
resource.to();
