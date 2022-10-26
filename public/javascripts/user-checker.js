async function get_user_info() {
    const id = document.getElementById('discord_id').value;
    if(isNaN(id)){
        console.log("Invalid id");
        alert("Invalid id!");
        return;
    }
    const user = get_discord_api_user_info(id);
    user.then(data => {
        document.getElementById('info').style.display = "";
        document.getElementById('date-info').style.display = "";
        const banner = document.getElementById('banner');
        const banner_link = document.getElementById('banner_a');
        const avatar = document.getElementById('avatar');
        const avatar_link = document.getElementById('avatar_a');
        banner.style.display = (data['banner_url'] == null ? "none" : "");
        banner_link.style.display = (data['banner_url'] == null ? "none" : "");
        banner.src = (data['banner_url'] == null ? "none" : data['banner_url'] + "?size=1024");
        avatar.style.display = (data['avatar_url'] == null ? "none" : "");
        avatar_link.style.display = (data['avatar_url'] == null ? "none" : "")
        avatar.src = (data['avatar_url'] == null ? "none" : data['avatar_url']);
        avatar_link.setAttribute("href", (data['avatar_url'] == null ? "" : data['avatar_url']));
        banner_link.setAttribute('href', (data['banner_url'] == null ? "" : data['banner_url'] + "?size=1024"));
        document.getElementsByClassName('result')[0].textContent = data['id'];
        document.getElementsByClassName('result')[1].textContent = data['username'] + "#" + data['discriminator'];
        if(data['bot'] != null && data['bot'] === true) document.getElementsByClassName('result')[1].appendChild(document.createElement("img")).setAttribute("src", "../images/bot_flag.png");
        document.getElementsByClassName('result')[2].textContent = data['formatted_timestamp'] + " UTC";
        document.getElementsByClassName('result')[3].appendChild(document.createElement("span")).textContent = data['banner_color'];
    })
}

async function get_discord_api_user_info(id) {
    let url = "users/" + id;
    const response = await fetch(url, {
        method: 'GET'
    });
    const json = await response.json();
    if(Object.entries(json).length === 1 || Object.entries(json).length === 0){
        return null;
    }
    return await json;
}