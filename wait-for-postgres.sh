# wait-for-postgres.sh

set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD="postgres" psql -h "$host" -d "todo_list" -U "postgres" -c '\q'
do
 echo "Postgres is unavailable - sleeping" 
 sleep 1 
done

echo "Postgres is up - executing command"
exec $cmd
