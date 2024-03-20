import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

import Account from '~/database/models/account.model';
import catchAsync from '~/utils/catchAsync';
import { random } from 'lodash';
import AppError from '~/utils/appError';

passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser<any, any>(async (id, done) => {
  try {
    // Retrieve user from the database based on the id
    const user = await Account.findOne({ where: { googleId: id } });

    if (!user) {
      // If user does not exist
      return done(new AppError('User not found', 404), null);
    }

    // Pass the user to the next middleware
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// manage google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: '/api/v1/auth/google/callback',
      passReqToCallback: true
    },
    async (
      req,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: Function
    ) => {
      try {
        const existingUser = await Account.findOne({
          where: { googleId: profile.id }
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await Account.create({
          username: profile.name!.givenName,
          email: profile.emails![0].value,
          googleId: profile.id,
          image: profile.photos![0].value,
          role: 'candidate',
          phone: 'N/A',
          password:
            profile.emails![0].value +
            profile.id +
            random(1000, 9999).toString()
        });

        done(null, newUser);
      } catch (error: any) {
        done(error, undefined);
      }
    }
  )
);

export default passport;
