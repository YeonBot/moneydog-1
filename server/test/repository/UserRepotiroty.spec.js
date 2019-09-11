import 'babel-polyfill';

import assert from 'assert';
import User from '../../src/schemas/user';
import {mongoConnect, mongoDisConnect} from '../../src/dbConfig/mongoDB';

import UserMock from '../mock/userMock';

describe('UserRepository Test', () => {
  describe('Database connect', () => {
    before(() => {
      console.log('before mongo start');
      mongoConnect();
    });
    describe('#delete()', () => {
      it('테스트 전, Mock User id 제거', (done) => {
        console.log('delete 시작');
        const userId = UserMock.email;
        User.deleteOne({email: userId}, (err) => {
          if (err) done(err);
          else done(err);
        });
      });
      after(() => {
        console.log('delete종료');
        mongoDisConnect();
      });
    });

    describe('#create()', () => {
      it('UserMock 으로 User 생성', (done) => {
        console.log('create start');
        User.create((UserMock), function(err) {
          if (err) done(err);
          else done();
        });
      });
      after(() => {
        console.log('create done');
        mongoDisConnect();
      });
    });

    describe('#find()', () => {
      it('User Id 로 User 검색', (done) => {
        const userId = UserMock.email;
        User.findOne({email: userId}, (err) => {
          if (err) done(err);
          else done(err);
        }).then((user) => {
          console.log(user);
        });
      });
      after(() => {
        mongoDisConnect();
      });
    });

    describe('#modify()', () => {
      it('User nickname 수정', (done) => {
        const userId = UserMock.email;
        const newNickname = 'test-user2';
        User.updateOne({email: userId}, {nickname: newNickname}, (err) => {
          if (err) done(err);
          else done(err);
        });
        User.findOne({ email: userId }, (err) => {
          if (err) err;
          else err;
        }).then((user) => {
          assert(user.nickname, newNickname);
        });
      });
      after(() => {
        mongoDisConnect();
      });
    });

    describe('#findAll()', () => {
      it('User 전체 조회', (done) => {
        User.find({}, (err) => {
          if (err) done(err);
          else done(err);
        }).then((users) => {
          users.map((user) => {
            console.log('email: ' + user.email);
            console.log(user);
            console.log('');
          });
        });
      });
      after(() => {
        mongoDisConnect();
      });
    });

    describe('#findByUserEmailToSubscription()', () => {
      it('User Id 로 User 검색 후 subscription 검색', (done) => {
        const userId = UserMock.email;
        User.findOne({email: userId}, (err) => {
          if (err) done(err);
          else done(err);
        }).then((user) => {
          console.log(user.subscription);
        });
      });
      after(() => {
        mongoDisConnect();
      });
    });
    after(() => {
      mongoDisConnect();
    });
  });
});
