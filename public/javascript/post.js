async function newPostHandler(event) {
    event.preventDefault()

    

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const forum_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    
    if (description && title) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                description: description,
                forum_id: forum_id,
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

document.getElementById('post-post').addEventListener('click', newPostHandler);