import { expect } from 'chai';
import { methods } from '../popup';
import sinon, { SinonSandbox } from 'sinon';
import store from '@/store';

describe('Popup Plugins', () => {
  describe('isOpen', () => {
    let sandbox: SinonSandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });
    afterEach(() => {
      sandbox.restore();
    });

    it('isOpen - true', () => {
      // given
      const component = { template: '<p>Test</p>' };
      const popupStub = sandbox.stub(store, 'commit');

      // when
      methods.open({ component });

      // then
      expect(popupStub.callCount).to.be.equal(1);
      expect(popupStub.getCall(0).args[0]).to.be.eql('popup/open');
      expect(popupStub.getCall(0).args[1]).to.be.eql({ component });
    });

    it('isOpen - false', () => {
      // given
      const popupStub = sandbox.stub(store, 'commit');

      // when
      methods.close();

      // then
      expect(popupStub.callCount).to.be.equal(1);
      expect(popupStub.getCall(0).args[0]).to.be.eql('popup/close');
    });
  });
});
