import boto3
import subprocess


def main():

    aws_command = [
        'aws', 'ecs', 'execute-command',
        '--cluster', 'alpha-cluster',
        '--task', 'arn:aws:ecs:us-east-1:733623710918:task/alpha-cluster/b749fff8f59243159fa7e83f3ff456df',
        '--command', 'bash',
        '--interactive'
    ]

    try:
        subprocess.run(aws_command, capture_output=False, text=True)
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")


if __name__ == "__main__":
    main()
