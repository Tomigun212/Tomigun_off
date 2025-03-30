document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Vérifier si le champ honeypot a été rempli
    const honeypot = document.getElementById('honeypot').value;
    if (honeypot) {
        console.log('Spam détecté. Le formulaire a été ignoré.');
        return; // Ne pas envoyer les données si le champ honeypot est rempli
    }

    // Récupérer les valeurs du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // URL du Webhook Discord (remplace avec l'URL de ton propre webhook)
    const webhookURL = 'https://discord.com/api/webhooks/1355873509686902927/7SjPN-N1Sb4th4egyWhUz4uF9LbDqjRWw88h6nt6YWs2KWdi_DV0MojfcilXvI38QeGI'; // Remplace par ton URL du webhook

    // Créer le contenu à envoyer à Discord
    const payload = {
        content: `Nouveau message du formulaire de contact !`,
        embeds: [
            {
                title: 'Message de Contact',
                fields: [
                    {
                        name: 'Nom',
                        value: name,
                    },
                    {
                        name: 'Email',
                        value: email,
                    },
                    {
                        name: 'Message',
                        value: message,
                    },
                ],
            },
        ],
    };

    // Envoyer le message à Discord via le Webhook
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => {
            alert('Votre message a été envoyé !');
            document.getElementById('contactForm').reset();  // Réinitialiser le formulaire
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi du message :', error);
            alert('Votre message a été envoyé !');
            document.getElementById('contactForm').reset();  // Réinitialiser le formulaire
        });
});
