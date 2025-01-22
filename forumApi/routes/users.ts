import express from 'express';
import User from '../models/User';
import auth, { Req } from '../middleware/auth';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    res.status(201).send({success: true, user: {username: user.username, token: user.token}});

  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e)
      return;
    }
    next(e);
  }
});

usersRouter.post('/session', async (req, res, next) => {
  try {
    const {username, password} = req.body;

    const user = await User.findOne({username})

    if (!user) {
      res.status(400).send({success: false, message: {username: 'User does not exist!'}});
      return;
    }

    const pass = await user.passwordCheckout(password);

    if (!pass) {
      res.status(400).send({success: false, message: {password: 'Wrong password!'}});
      return;
    }

    user.generateToken();
    await user.save()

    res.status(200).send({success: true, user: {username: user.username, token: user.token}});

  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e)
      return;
    }
    next(e);
  }
});

usersRouter.delete('/', auth, async (req: Req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(400).send({success: false, message: 'User not authenticated!'})
      return;
    }

    const updateToken = await User.findById(user._id);

    if (!updateToken) {
      res.status(400).send({success: false, message: 'Wrong id!'});
      return;
    }

    updateToken.generateToken()
    await updateToken.save();
    res.status(200).send({success: true, message: 'Logout successfully!'});

  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e)
      return;
    }
    next(e);
  }
})

export default usersRouter;