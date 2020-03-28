module.exports = function (password, email, username) {
    let html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Parisienne&display=swap" rel="stylesheet">
        <title>G-List</title>
    </head>
    <body style="margin: 0;padding: 0;display: block;background: rgb(82, 82, 82);">
        <div class="header" style="position: fixed;top: 0;width: 100%;margin: 0 auto;font-family: 'Parisienne', cursive, sans-serif;text-align: center;background: #3C91E6;color: #F9FCFF;">
            <h1 class="header-text" style="height: 10vh;line-height: 10vh;font-size: 8vh;margin: 0;padding: 0;">G-List</h1>
        </div>
        <div class="content" style="position: fixed;top: 10%;width: 100%;height: 75vh;font-family: sans-serif;padding: 2.5% 0;">
            <div class="inner-content" style="width: 75%;margin-left: 12.5%;overflow: scroll;border-radius: 8px;background: #F9FCFF;">
                <div class="invite-header" style="height: 32px;line-height: 32px;font-size: 24px;text-align: center;text-transform: capitalize;color: #2F3338;margin-bottom: 32px;padding: 2%;">
                    ${username} has invited you to join G-List!
                </div>
                <div class="invite-message" style="height: auto;padding: 2%;line-height: 16px;color: #2F3338;width: 96%;margin: 0 auto;text-align: center;">
                    Join today to create custom grocery lists based off of where you shop!
                </div>
                <div class="invite-credentials" style="height: auto;width: 100%;line-height: 16px;color: #2F3338;margin: 3vh auto;">
                    <div class="credential-message" style="color: #2F3338;height: auto;font-size: 16px;width: 96%;margin: 0 auto;text-align: center;">
                        Use the credentials below to join today!
                    </div>
                    <div class="email" style="height: auto;width: 96%;margin: 0 auto;text-align: center;font-size: 24px;line-height: 24px;padding: 2%;color: #2F3338;">
                        Email: ${email}
                    </div>
                    <div class="password" style="height: auto;width: 96%;margin: 0 auto;text-align: center;font-size: 24px;line-height: 24px;padding: 2%;color: #2F3338;">
                        Password: ${$password}
                    </div>
                </div>
                <a href="https://grocery-list-cb.herokuapp.com/login" class="invite-button" style="height: 10vh;line-height: 10vh;font-size: 7vh;display: block;width: 96%;text-align: center;border-radius: 8px;margin: 2%;color: #F9FCFF;background: #3C91E6;text-transform: capitalize;text-decoration: none;transition: 0.3s;">
                    Join
                </a>
            </div>
        </div>
        <footer class="footer" style="position: fixed;top: 90%;width: 100%;height: 10vh;line-height: 10vh;font-family: sans-serif;background: #3C91E6;color: #F9FCFF;">
    
        </footer>
    </body>
    
    </html>`;
    return html;
}