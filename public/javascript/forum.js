async function newForumHandler(event) {
    event.preventDefault()

    const title = document.querySelector('textarea[name="title"]').value.trim();


    if (comment_text) {
        const response = await fetch('/api/forums', {
            method: 'POST',
            body: JSON.stringify({
                title

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    if (response.ok) {
        document.location.reload()
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#post-forum').addEventListener('submit', newForumHandler)