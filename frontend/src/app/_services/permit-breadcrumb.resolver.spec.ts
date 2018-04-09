import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { MockRouter } from '../_mocks/routes.mock';
import { PermitBreadcrumbsResolver } from './permit-breadcrumbs.resolver';
import { McBreadcrumbsResolver } from 'ngx-breadcrumbs';
import * as sinon from 'sinon';

class MockMcBreadcrumbsResolver {
  getFullPath() {
    return '';
  }
}

describe('Permit Confirmation Breadcrumb Resolver', () => {
  describe('resolve', () => {
    const mockPermitActivatedRoute = {
      params: [{id: 'arp'}],
      data: {
        permit: {
          forestAbbr: 'arp',
          forest: {forestName: 'arp arp'}
        }
      }
    };

    let mockRouter;
    const mcBreadcrumbsResolver = sinon.stub(McBreadcrumbsResolver.prototype, 'getFullPath').returns('');

    beforeEach(async(() => {
      mockRouter = new MockRouter();
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          PermitBreadcrumbsResolver,
          {provide: McBreadcrumbsResolver, useValue: mcBreadcrumbsResolver},
          {provide: Router, useValue: mockRouter},
          {provide: ActivatedRoute, useValue: mockPermitActivatedRoute}
        ]
      });
    }));


    it('should resolve the breadcrumbs', () => {
      const resolver = TestBed.get(PermitBreadcrumbsResolver);
      const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

      expect(resolver.resolve(mockPermitActivatedRoute, mockSnapshot)).toEqual([
        Object({
          text: 'Christmas tree permits',
          path: '/christmas-trees/forests'
        }), Object({text: 'arp arp', path: '/christmas-trees/forests/undefined'}),
        Object({text: 'Buy a permit', path: '/christmas-trees/forests/undefined/applications'}),
        Object({text: 'Permit confirmation', path: '/christmas-trees/forests/undefined/applications/permits/undefined'})
      ]);

    });
  });
});
