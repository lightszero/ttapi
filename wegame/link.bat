echo 尝试符号链接
mklink /d ttapi ..\common\ttapi
mklink /d ttimpl_wegame ..\common\ttimpl_wegame
mklink /d ttui ..\common\ttui
mklink /d ttlayer2 ..\common\ttlayer2
mklink /d ttsample ..\common\ttsample

echo 尝试路径链接
mklink /j ttapi ..\common\ttapi
mklink /j ttimpl_wegame ..\common\ttimpl_wegame
mklink /j ttui ..\common\ttui
mklink /j ttlayer2 ..\common\ttlayer2
mklink /j ttsample ..\common\ttsample