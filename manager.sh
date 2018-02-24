#!/bin/sh  
# DateTime: 2017-03-22
# Author: zhaochenglan  
# Source function library.  
. /etc/rc.d/init.d/functions  
 
# Source networking configuration.  
. /etc/sysconfig/network  
source /gaodun/script/env.sh
export PM2_HOME=/gaodun/logs/.pm2
 
# Check that networking is up.  
[ "$NETWORKING" = "no" ] && exit 0   
BASEDIR=$(dirname $(readlink /proc/$$/fd/255))
cd $BASEDIR
name=`basename $BASEDIR`
if [[ -f "server.js" ]]
then
	appjs_path=server.js
else
	appjs_path=app.js	
fi
pm2=/gaodun/dist/node6.9/bin/pm2
outlog='/gaodun/logs/node/'$name'.log'
errlog='/gaodun/logs/node/'$name'_error.log'
pid="/gaodun/data/work/${name}.pid"
start() {   
    [ -x ${pm2} ] || exit 5   
    echo -n $"Starting $prog: "
    #/gaodun/dist/node6.9/bin/pm2 --name $name -o $outlog -e $errlog start $appjs_path --watch
    nohup /gaodun/dist/node6.9/bin/node $appjs_path >> $outlog 2>&1 &
    echo $! > ${pid}
    echo 'start ok' 
}
stop() {
  echo -n $"Stop $prog: "
  #$pm2 stop $name
  #$pm2 delete $name
  kill -9 `cat ${pid}`
  echo 'stopd'
}
restart(){
    stop
    sleep 1
    start
}
status(){
    $pm2 status
}

delete(){
    $pm2 delete $1
}
case "$1" in
    start)
        $1
        ;;
    stop)
        $1
        ;;
    restart)
        $1
        ;;
    status)
        $1
        ;;
    delete)
        delete $2
        ;;
    *)
        echo $"Usage: $0 {start|stop|restart|status|delete} {name}"
        exit 2
esac
