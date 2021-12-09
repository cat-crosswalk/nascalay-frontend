import React from 'react'

const GameSetting = () => {
  return (
    <div>
      <div>
        <h2>ゲーム設定</h2>
        <div>
          <p>時間設定</p>
        </div>
      </div>
      <div>
        <h2>招待</h2>
        <input type="text" placeholder="招待コードを入力" />
        <button>Copy</button>
      </div>
      <button>スタート</button>
    </div>
  )
}

export default GameSetting
