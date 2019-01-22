class Character {
  constructor(props) {
    this.name = props.name;
    this.hp = props.hp;
    this.initialHp = props.initialHp;
    this.mp = props.mp;
    this.initialMp = props.initialMp;
    this.offensePower = props.offensePower;
    this.defencePower = props.defencePower;
  }

  showStatus() {
    document.getElementById('main').innerHTML = `${this.name} HP : ${this.hp} / MP : ${this.mp}`;
    /* 
      キャラクターの名前、HP、MPを表示する。
    */
  }

  attack(defender) {
    const damage = this.offensePower - defender.defencePower;
    if (defender.hp !== 0) {
      if (defender.hp <= this.offensePower) {
        console.log(`${this.name}の攻撃！${defender.name}に${damage}のダメージ！${defender.name}は力尽きた！`);
      } else {
        console.log(`${this.name}の攻撃！${defender.name}に${damage}のダメージ！`);
      }
    } else {
      console.log(`${this.name}の攻撃！しかし${defender.name}はHPが0なので攻撃できない！`)
    }
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。 
    */
  }

  calcAttackDamage(defender) {
    const damage = this.offensePower - defender.defencePower;
    if (damage < 0) {
      return defender.hp - 1;
    } else {
      return defender.hp - damage;
    }
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
  }
}


// class Sorcerer extends Character {
//   constructor() {
    
//   }

//   healSpell(target) {
//     /* 
//       回復魔法は3のMPを消費する。
//       相手のHPを15回復する。
//       魔法使いが死んでいる場合はその旨を表示する。
//       相手が死んでいる場合は回復が出来ないためその旨を表示する。
//       MPが足りない場合はその旨を表示する。
//     */
//   }

//   fireSpell(target) {
//     /* 
//       攻撃魔法は2のMPを消費する。
//       相手に10のダメージを与える。
//       魔法使いが死んでいる場合はその旨を表示する。
//       相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
//       MPが足りない場合はその旨を表示する。
//     */
//   }
// }

{
  const fighter = new Character({
    name: '武道家🕺',
    hp: 40,
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  // const sorcerer = new Sorcerer({
  //   name: '魔法使い👩‍🎨',
  //   hp: 25,
  //   mp: 10,
  //   offensePower: 8,
  //   defencePower: 10
  // })
  const monster = new Character({
    name: 'モンスター😈',
    hp: 60,
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  // sorcerer.attack(monster);
  // monster.attack(sorcerer);
  fighter.attack(monster);
  // sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  // sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  // sorcerer.showStatus();
  monster.showStatus();
}