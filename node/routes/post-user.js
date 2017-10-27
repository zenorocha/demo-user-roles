import config from '../config';
import wedeploy from 'wedeploy';

const auth = wedeploy.auth(config.authServiceUrl).auth(config.masterToken);

/**
 * Post User Route
 * @param  {Request} req 
 * @param  {Response} res
 * @param  {Function} next
 */
export async function postUser(req, res, next) {
  try {
    await auth.createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      supportedScopes: ['free'],
    });
    await auth.signInWithEmailAndPassword(req.body.email, req.body.password);
    res.cookie('access_token', auth.currentUser.token);
    res.redirect('/user');
  } catch (error) {
    res.redirect('/signup?cmd=fail');
  }
}
