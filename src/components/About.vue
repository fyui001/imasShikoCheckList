<template>
    <b-container>
        <div class="about">
            <h1>このサイトについて</h1>
            <p>シコったアイマス声優達をチェックリストをURLで管理運用できるものです</p>
            <b-alert show>
                現在は声優のみの対応ですが近々アイドルでも対応できるようにしたいです。
            </b-alert>
            <h1>使い方</h1>
            <p>
                <router-link to="/">
                    トップページ
                </router-link>
                でシコった声優達をチェックして保存ぼたんを押して出てきたURLをどこかにメモるだけ!
            </p>
            <p>生成されたURLにアクセスすればあなたのシコチェックリストが表示されます。</p>
            <p>一度URLを作ってしまえば更新もできるので毎回作り直す必要がないようになっています</p>
        </div>
    </b-container>
</template>
<script lang="ts">
  import Vue from 'vue'

  const AboutVue = Vue.extend({})
  export default AboutVue
</script>
<style>
    h1 {
        border-bottom: thin solid;
    }
    p{
        margin: 10px;
        font-size: 20px;
    }
    .about {
        margin-top: 20px;
    }
</style>
