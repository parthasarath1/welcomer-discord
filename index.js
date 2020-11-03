require("dotenv").config();

const Discord = require("discord.js");

const Canvas = require("canvas");

const config = require("./config.json");

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Welcomer Ready");
});

client.on("message", (message) => {
  if (message.channel.type === "dm") {
    return;
  }
});

client.on("guildMemberAdd", async (member) => {
  console.log("joined");
  const wecomeChannelID = config.channelId;

  const welcomeChannel = member.guild.channels.cache.get(wecomeChannelID);
  const welcomeImage = Canvas.createCanvas(1200, 250);
  const ctx = welcomeImage.getContext("2d");
  const welcomeBg = await Canvas.loadImage("https://i.ibb.co/rMFMccP/bg.png");
  ctx.drawImage(welcomeBg, 0, 0, welcomeImage.width, welcomeImage.height);
  ctx.strokeStyle = "white";
  ctx.strokeRect(0, 0, welcomeImage.width, welcomeImage.height);

  ctx.fillStyle = "white";

  let size1 = 60;
  let size2 = 50;
  let size3 = 40;

  let name = member.user.tag;
  do {
    ctx.font = `${(size1 -= 5)}px snas`;
  } while (ctx.measureText(name).width > welcomeImage - 225);
  ctx.fillText(name, 300, 130);
  let nam = "Welcome";
  do {
    ctx.font = `${(size2 -= 5)}px snas`;
  } while (ctx.measureText(name).width > welcomeImage - 225);
  ctx.fillText(nam, 480, 52);
  let namee = "To";
  do {
    ctx.font = `${(size3 -= 5)}px snas`;
  } while (ctx.measureText(name).width > welcomeImage - 225);
  ctx.fillText(namee, 530, 180);

  let nameee = "Apex Legends Mobile INDIA Server";
  do {
    ctx.font = `${(size3 -= 5)}px snas`;
  } while (ctx.measureText(name).width > welcomeImage - 225);
  ctx.fillText(nameee, 330, 220);

  ctx.beginPath();
  ctx.arc(100, 100, 75, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  const welcomeAv = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "png" })
  );
  ctx.drawImage(welcomeAv, 25, 25, 150, 150);
  const attachment = new Discord.MessageAttachment(
    welcomeImage.toBuffer(),
    "welcome.png"
  );
  member.roles.add(config.roleId);
  const disE = ">";
  const eS = " ";

  const dmE = new Discord.MessageEmbed()
    .setAuthor(`Welcome To Apex Mobile India Server`)
    .setFooter(`hope you Have Good Times With Us`)
    .setThumbnail("https://i.ibb.co/pRb26gS/logo.png")
    .setDescription(
      `First of All Thanks For Joining Us, I Think By This Time You Have Verified Your Self, if yes Thank you So Much Now You will be ready to Explore different parts Of the server, if Not Please Verify Yourself and get access to the server, BTW you can extend your support by following us on out Social Media.`
    )
    .setColor("#00ffff")
    .addFields({
      name: `Follow Us on SOCIAL MEDIA`,
      value: `
        ${disE} **Youtube :** [Click Here](https://www.youtube.com/channel/UC7ErOML9nVcBlXKnbAQoqVQ/)
        ${disE} **Instagram :** [Click Here](https://www.instagram.com/apexmindia/)`,
    });
  welcomeChannel.send(
    `
${disE} Hey <@${member.id}>,
${disE} ━━━━━━━━━━━━━━━━━━━━━━━━━━━
${disE} <a:t5:772831156059242516> Welcome To **Apex Legends Mobile India** Server <a:t5:772831156059242516> 
${disE} Thanks For Joining Us, Let Me Walk you Through Some Steps,<a:2628_rainbowdown:769389381894275082>
${disE} ━━━━━━━━━━━━━━━━━━━━━━━━━━━
${disE}   <a:r_O:772721283532062740>  Read Server Rules here <#${config.channels.rules}>
${disE}   <a:r_O:772721283532062740>  Read Some FAQ's About Us <#${config.channels.faq}>
${disE}   <a:r_O:772721283532062740>  Get Your Desired roles for extra Benifits <#${config.channels.rxnR}>
${disE}   <a:r_O:772721283532062740>  Chat With Others Here <#${config.channels.genChat}>
${disE} ━━━━━━━━━━━━━━━━━━━━━━━━━━━
${disE} These Were Some Get Started Things, Now Eplore Server..
${disE} Have A Great Time!
    `,
    attachment
  );
  await member
    .send(dmE)
    .then(member.send(`-Sent form Apex Mobile Discord Server.`));
});

client.on("guildMemberRemove", async (member) => {
  const channelId = config.leave.channelId;
  const leaveChannel = member.guild.channels.cache.get(channelId);

  const byeE = new Discord.MessageEmbed()
    .setColor("#00ffff")
    .setAuthor(`Bye Bye`)
    .setDescription(
      `
    <@${member.user.id}> Has just left the server,
    
    user id : ${member.user.id}`
    )
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();
  leaveChannel
    .send(byeE)
    .then(
      member.user.send(
        `you Have just Left Apex Mobile India Server , Hope You had a Good Time. `
      )
    );
});
client.login(process.env.TOKEN);
