# 实现了报头+正文的应用层协议
# 服务器端和客户端通过判断Username是否为xjs进行连接测试

const Net=require('net');
const Events=require('events');

class _xjsHead{ 
    version; server; len; 
    EnCode(version,server,len){
        this.version=version;
        this.server=server;
        this.len=len;
    }
    ToString(){ 
        let tmpVer=Buffer.alloc(4); tmpVer.writeUInt32BE(this.version);
        let tmpSer=Buffer.alloc(4); tmpSer.writeUInt32BE(this.server);
        let tmpLen=Buffer.alloc(4); tmpLen.writeUInt32BE(this.len);
        return Buffer.concat([tmpVer,tmpSer,tmpLen]);
    }
    DeCode(tmpHead){ 
        if (tmpHead.length<12) return false;
        this.version=tmpHead.readUInt32BE(0);
        this.server=tmpHead.readUInt32BE(4);
        this.len=tmpHead.readUInt32BE(8);
        return true;
    }
    Print(){ 
        console.log('\t Head: ',
                    '\n\t\tversion: ',this.version,
                    '\n\t\tserver: ',this.server,
                    '\n\t\tlength: ',this.len); 
    }
};

class _xjsBody{ 
    data; 
    EnCode(data){ 
        this.data=JSON.stringify(data); 
    }
    Length(){ 
        return this.data.length; 
    }
    ToString(){ 
        return Buffer.from(this.data); 
    }
    DeCode(tmpBody,tmpLen){
        if (tmpBody.length!==tmpLen) return false;
        this.data=JSON.parse(tmpBody.toString('utf-8'));
        return true;
    }
    Print(){ 

        console.log('\t Body: ',this.data); 
    }
};

class _xjsMsg{ 

    head=new _xjsHead(); body=new _xjsBody(); 
    EnCode(version,server,data){
        this.body.EnCode(data);
        this.head.EnCode(version,server,this.body.Length());
    }
    ToString(){ 
        return Buffer.concat([this.head.ToString(),this.body.ToString()]); 
    }
    DeCode(tmpMsg){
        return (this.head.DeCode(tmpMsg.slice(0,12))&&
                this.body.DeCode(tmpMsg.slice(12),this.head.len));
    }
    Print(){ 
        this.head.Print(); this.body.Print(); 
    }
};


class Request extends Events{
    msg=new _xjsMsg();
    EnCode(version,server,data){ 
        this.msg.EnCode(version,server,data); 
    }
    ToString(){ 
        return this.msg.ToString(); 
    }
    DeCode(tmpMsg){ 
        if (this.msg.DeCode(tmpMsg)){
            if (this.msg.body.data.Start) this.emit('init');
            else this.emit('test');
            return true;
        } else return false;
    }
    Print(){ this.msg.Print(); }
};

Net.createServer((Server)=>{
    let req=new Request();
    req.on('init',()=>{
        console.log('req:'); 
        req.toString();
        req.EnCode(1,1,{init: true});
        Server.write(req.ToString());
    })
    req.on('test',()=>{
        let tmp=req.msg.body.data.UserName;
        console.log('req:'+tmp); 
        if (tmp=='xjs'){
            console.log('Test Successfully');
            Socket.emit('end');
        }
        else console.log('Test failed');
        req.EnCode(1,1,{UserName:tmp});
        Server.write(req.ToString());
    })
    Server.on('data',(transMessage)=>{ req.DeCode(transMessage); });
    Server.on('end',()=>{ req=null; });
}).listen(8088);

const Socket=Net.connect(8088);
SocketReq=new Request();
const HandleTest=setInterval(()=>{ Socket.emit('test'); },1000);

Socket.on('connect',()=>{
    console.log('Connected');
    SocketReq.EnCode(1,1,{UserName:'xjs'});
    Socket.write(SocketReq.ToString());
});
SocketReq.on('test',()=>{
    let language=SocketReq.message.body.data.UserName;
    if (tmp!==undefined){
        console.log('Server\'s User:'+tmp);
        if (tmp==='xjs'){
            Socket.emit('end');
            clearInterval(HandleSend);
        }
    }
    else console.log('Test!');
});
Socket.on('data',(transMessage)=>{ SocketReq.DeCode(transMessage); });
Socket.on('end',()=>{ 
    console.log('Test ends'); 
    SocketReq=null; 
});
