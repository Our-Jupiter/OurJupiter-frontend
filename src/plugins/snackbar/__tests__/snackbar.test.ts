import { expect } from 'chai';
import { methods } from '../snackbar';
import sinon, { SinonSandbox } from 'sinon';
import { Snackbar } from '../types';

describe('Snackbar Plugins', () => {
  let sandbox: SinonSandbox;
  let vsNotiStub: sinon.SinonStub;
  let snackbarMethods: Snackbar;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    vsNotiStub = sandbox.stub();
    const fakeVue: any = {
      prototype: {
        $vs: {
          notification: vsNotiStub,
        },
      },
    };
    snackbarMethods = methods(fakeVue);
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('info', () => {
    it('info', () => {
      // given
      const text = 'TEXT';

      // when
      snackbarMethods.info(text);

      // then
      expect(vsNotiStub.callCount).to.be.equal(1);
      expect(vsNotiStub.getCall(0).args[0].color).to.be.eql('primary');
      expect(vsNotiStub.getCall(0).args[0].text).to.be.eql(text);
    });
  });

  describe('success', () => {
    it('success', () => {
      // given
      const text = 'TEXT';

      // when
      snackbarMethods.success(text);

      // then
      expect(vsNotiStub.callCount).to.be.equal(1);
      expect(vsNotiStub.getCall(0).args[0].color).to.be.eql('success');
      expect(vsNotiStub.getCall(0).args[0].text).to.be.eql(text);
    });
  });

  describe('warn', () => {
    it('warn', () => {
      // given
      const text = 'TEXT';

      // when
      snackbarMethods.warn(text);

      // then
      expect(vsNotiStub.callCount).to.be.equal(1);
      expect(vsNotiStub.getCall(0).args[0].color).to.be.eql('warning');
      expect(vsNotiStub.getCall(0).args[0].text).to.be.eql(text);
    });
  });

  describe('error', () => {
    it('error', () => {
      // given
      const text = 'TEXT';

      // when
      snackbarMethods.error(text);

      // then
      expect(vsNotiStub.callCount).to.be.equal(1);
      expect(vsNotiStub.getCall(0).args[0].color).to.be.eql('danger');
      expect(vsNotiStub.getCall(0).args[0].text).to.be.eql(text);
    });
  });
});
