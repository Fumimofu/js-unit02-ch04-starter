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
    const main = document.getElementById('main');
    main.innerHTML = `<p>${this.name} HP : ${this.hp} / MP : ${this.mp}</p>`;

    /* 
      キャラクターの名前、HP、MPを表示する。
    */
  }

  attack(defender) {
    const main = document.getElementById('main');

    if (this.hp <= 0) {
      main.innerHTML = `<p>${this.name}は死んでいるので攻撃できない！</p>`;
      return;
    }

    if (defender.hp <= 0) {
      main.innerHTML = `<p>${defender.name}は死んでいるので攻撃できない！</p>`;
      return;
    }

    const damage = this.calcAttackDamage(defender);
    defender.hp -= damage;

    if (defender.hp <= 0) {
      main.innerHTML = `<p>${this.name}は${defender.name}に${damage}のダメージを与えた！${defender.name}は力尽きた。</p>`;
    } else {
      main.innerHTML = `<p>${this.name}は${defender.name}に${damage}のダメージを与えた！</p>`;
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
      return defender.hp -= 1;
    } else {
      return defender.hp -= damage;
    }
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
  }
}

class Sorcerer extends Character {
  constructor(props) {
    super(props);
  }

  healSpell(target) {
    const main = document.getElementById('main');

    if (this.hp <= 0) {
      main.innerHTML = `<p>${this.name}は死んでいるので魔法が使えない！</p>`;
    }

    if (target.hp <= 0) {
      main.innerHTML = `<p>${target.name}は死んでいるので回復できない！</p>`;
    }

    if (this.mp < 3) {
      main.innerHTML = `<p>MPが足りないのでこの魔法は使えない！</p>`;
    }　else {
      const thisMp = this.mp -= 3;
      const heal = target.hp += 15;
      main.innerHTML = `<p>ヒール！${target.name}のHPは${heal}に増えた！${this.name}のMPは${thisMp}に減った！</p>`;
    }

    /* 
      回復魔法は3のMPを消費する。
      相手のHPを15回復する。
      魔法使いが死んでいる場合はその旨を表示する。=> 1 innerHTML
      相手が死んでいる場合は回復が出来ないためその旨を表示する。=> 2 innerHTML
      MPが足りない場合はその旨を表示する。=> 3 innerHTML, if文
    */
  }

  fireSpell(target) {
    const main = document.getElementById('main');

    if (this.hp <= 0) {
      main.innerHTML = `<p>${this.name}は死んでいるので魔法が使えない！</p>`
    }

    if (target.hp <= 0) {
      main.innerHTML = `<p>${target}は死んでいるので回復できない！</p>`
    }

    if (this.mp < 2) {
      main.innerHTML = `<p>MPが足りないのでこの魔法は使えない！</p>`
    } else {
      const thisMp = this.mp -= 2;
      const damage = target.hp -= 10;
      main.innerHTML = `<p>ファイア！${target.name}に${damage}のダメージ！${this.name}のMPは${thisMp}に減った！</p>`
    }

    /* 
      攻撃魔法は2のMPを消費する。
      相手に10のダメージを与える。
      魔法使いが死んでいる場合はその旨を表示する。=> 1 innerHTML
      相手が死んでいる場合は攻撃が出来ないためその旨を表示する。=> 2 innerHTML
      MPが足りない場合はその旨を表示する。=> 3 innerHTML, if文
    */
  }
}

{
  const fighter = new Character({
    name: '武道家🕺',
    hp: 40,
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  const sorcerer = new Sorcerer({
    name: '魔法使い👩‍🎨',
    hp: 25,
    mp: 10,
    offensePower: 8,
    defencePower: 10
  })
  const monster = new Character({
    name: 'モンスター😈',
    hp: 60,
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  sorcerer.attack(monster);
  monster.attack(sorcerer);
  fighter.attack(monster);
  sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  sorcerer.showStatus();
  monster.showStatus();
}