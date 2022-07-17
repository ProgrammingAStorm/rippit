async function newForumHandler(event) {
    event.preventDefault()

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    console.log({
        title: title,
        description: description,
    })

    if (description && title) {
        const response = await fetch('/api/forums', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                description: description,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
}

document.getElementById('post-forum').addEventListener('submit', newForumHandler)