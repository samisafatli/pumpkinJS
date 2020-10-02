var buttonElement = document.querySelector('#app button')
var listElement = document.querySelector('#app ul')
var inputElement = document.querySelector('#app input')

var repos = JSON.parse(localStorage.getItem('list_repos')) || []

renderRepos()

function renderRepos(){
    listElement.innerHTML = ''
    for(repo of repos){
        var repoElement = document.createElement('li')
        
        var linkElement = document.createElement('a')
        linkElement.setAttribute('href', repo)
        var linkText = document.createTextNode(`${repo}`)

        linkElement.appendChild(linkText)
    
        repoElement.appendChild(linkElement)
        listElement.appendChild(repoElement)
    }
}

function searchUser(){
    let username = inputElement.value
    axios.get(`https://api.github.com/users/${username}`)
    .then(function(response){
        const {repos_url} = response.data
        addRepo(repos_url)
        inputElement.value = ''
    })
    .catch(function(error){
        console.log(error)
        alert(`Error: ${error}`)
    })
}

buttonElement.onclick = searchUser

function addRepo(repo){
    repos.push(repo)
    renderRepos()
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('list_repos', JSON.stringify(repos))
}
