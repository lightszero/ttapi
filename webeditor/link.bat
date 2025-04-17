echo 尝试符号链接
mklink /d ttapi ..\common\ttapi
mklink /d ttimpl_web ..\common\ttimpl_web
mklink /d ttlayer2 ..\common\ttlayer2
mklink /d _doc ..\_doc
echo 尝试路径链接
mklink /j ttapi ..\common\ttapi
mklink /j ttimpl_web ..\common\ttimpl_web
mklink /j ttlayer2 ..\common\ttlayer2
mklink /j _doc ..\_doc