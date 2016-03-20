describe('HeaderDirective', () => {

    let element, scope;
    // initialize module and directive template
    beforeEach(angular.mock.module('crudApp'));
    // in karma config html templates are associated to module templates
    beforeEach(angular.mock.module("templates")); 

    beforeEach(inject(function(_$rootScope_,_$compile_) {
        let $rootScope = _$rootScope_,
            $compile = _$compile_;

        scope = $rootScope.$new();

        element = angular.element('<header-directive></header-directive>');
       
        $compile(element)(scope);

    }));

    it('must render the directive template', () => {
        scope.$digest();
        let links = element.find('div');
        expect(links.length).toBeGreaterThan(0);
    });

    it('must nost display admin button, if not logged in', () => {
        scope.loggedin = false;
        scope.$digest();
        let links = element.find('#admin');
        expect(links.length).toBe(0);
    });
});