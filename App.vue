<template>
    <div>
        <header>
            <h1>欢迎来到我的GitHub主页</h1>
        </header>
        <main>
            <section>
                <h2>关于我</h2>
                <p>这里是关于我的介绍。</p>
            </section>
            <section>
                <h2>项目</h2>
                <p>这里是我的项目列表。</p>
            </section>
        </main>
        <footer>
            <p>版权所有 &copy; 2023</p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'App'
};
</script>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

header {
    background-color: #333;
    color: #fff;
    padding: 1rem 0;
    text-align: center;
}

main {
    padding: 1rem;
}

section {
    margin-bottom: 2rem;
}

footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    bottom: 0;
}
</style>
