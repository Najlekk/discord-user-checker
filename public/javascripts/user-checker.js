async function get_user_info() {
    const id = document.getElementById('discord_id').value;
    const information_div = document.getElementById('info');
    const user = get_discord_api_user_info(id);
    user.then(data => {
        information_div.appendChild(document.createElement("h1")).textContent = "Name with discriminator " + data['username'] + "#" + data['discriminator'];
        information_div.appendChild(document.createElement("h1")).textContent = "ID: " + data['id'];
        information_div.appendChild(document.createElement("h1")).textContent = "Banner color: " + data['banner_color'];
    })
}

async function get_discord_api_user_info(id) {
    let url = "users/" + id;
    const response = await fetch(url, {
        method: 'GET'
    });
    return await response.json();
}