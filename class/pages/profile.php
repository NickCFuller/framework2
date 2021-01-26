<?php
/**
 * A class that contains code to handle any requests for  /profile/
 *
 * @author Your Name <Your@email.org>
 * @copyright year You
 * @package Framework
 * @subpackage UserPages
 */
    namespace Pages;

    use \Support\Context as Context;
/**
 * Support /profile/
 */
    class Profile extends \Framework\Siteaction
    {
/**
 * Handle profile operations
 *
 * @param Context   $context    The context object for the site
 *
 * @return string|array   A template name
 */
        public function handle(Context $context)
        {
            $fdt = $context->formdata('post');
            if ($fdt->exists('email')){
                $change = FALSE;
                $user = $context->user();
                try {
                    $email = $fdt-mustfetch('email', FILTER_VALIDATE_EMAIL);
                    if ($email !== $user->email){
                        $user->email = $email;
                        $change = TRUE;
                    }
                } catch(\Framework\Exception\BadValue $e) {
                    $context->local()->message(\Framework\Local::ERROR, 'Invalid Email Address');
                }
                $pw = $fdt->mustfetch('pw');
                if ($pw !== ''){
                    if ($pw !== $fdt->mustfetch('rpw')){
                        $context->local()->message(\Framework\Local::ERROR, 'Passwords do not match');
                    }elseif (!\Model\User::pwValid($pw)){
                        $context->local()->message(\Framework\Local::ERROR, 'Passwords is too weak');
                    } else {
                        $user->setpw($pw);
                        $change = TRUE;
                    }
                }
                if ($change) {
                    \R::store($user);
                    $context->local()->message(\Framework\Loacl::MESSAGE, 'Updated');
                }
            }
            return '@content/profile.twig';
        }
    }
?>