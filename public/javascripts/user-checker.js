async function get_user_info() {
    const id = document.getElementById('discord_id').value;
    const user = get_discord_api_user_info(id);
    user.then(data => {
        document.getElementById('info').style.display = "";
        document.getElementById('avatar').setAttribute('src', data['avatar_url']);
        document.getElementById('banner').setAttribute('src', data['banner_url'] + "?size=1024");
        document.getElementsByClassName('result')[0].textContent = data['id'];
        document.getElementsByClassName('result')[1].textContent = data['username'] + "#" + data['discriminator'];
        document.getElementsByClassName('result')[2].appendChild(document.createElement("span")).textContent = data['banner_color'];
    })
}

async function get_discord_api_user_info(id) {
    let url = "users/" + id;
    const response = await fetch(url, {
        method: 'GET'
    });
    return await response.json();
}